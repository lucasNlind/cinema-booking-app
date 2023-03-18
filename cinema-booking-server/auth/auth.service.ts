import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const USER_TYPE_USER = 'USER';
const USER_TYPE_ADMIN = 'ADMIN';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return await hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        console.log('User: ', user)
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            homeAddress,
            password,
            isSubscribed
        } = user;
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !homeAddress || 
            !password
        ) {
            throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) throw new HttpException('An account with that email already exists.', HttpStatus.CONFLICT); 

        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(
            USER_TYPE_USER,
            firstName,
            lastName,
            email,
            phoneNumber,
            hashedPassword,
            homeAddress,
            isSubscribed,
            false
        );
        return this.userService._getUserDetails(newUser);
    }

    async changePassword(email: string, newPassword: string): Promise<UserDetails | any> {
        const hashedPassword = await this.hashPassword(newPassword);
        const updatedUser = await this.userService.changePassword(email, hashedPassword);
        return this.userService._getUserDetails(updatedUser);
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;
        if (!doesUserExist) return null;
        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);
        if (!doesPasswordMatch) return null;
        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO): Promise<{ token: string } | null> {
        const { email, password } = existingUser;
        if (!email || !password) throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
        const user = await this.validateUser(email.toLowerCase(), password);
        if (!user) throw new HttpException('Invalid Credentials.', HttpStatus.UNAUTHORIZED);
        const jwt = await this.jwtService.signAsync({ user });
        return { token: jwt };
    }

    async verifyJwt(jwt: string): Promise<{ exp: number }> {
        try {
            const { exp } = await this.jwtService.verifyAsync(jwt);
            return { exp };
        } catch (error) {
            throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
        }
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        return apiKey === process.env.API_KEY;
    }
}
