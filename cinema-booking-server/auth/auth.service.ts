import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { MailService } from 'cinema-booking-server/mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument } from 'cinema-booking-server/user/user.schema';
import { UpdateUserDTO } from 'cinema-booking-server/user/dto/update-user.dto';

const USER_TYPE_USER = 'USER';
const USER_TYPE_ADMIN = 'ADMIN';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService, private mailService: MailService) {}

    makeActivationCode(): string {
        let activationCode = '';
        for (let i = 0; i < 4; i++) {
            activationCode += Math.floor(Math.random() * 10).toLocaleString();
        }
        return activationCode;
    }

    makeTemporaryPassword(): string {
        return Math.random().toString(36).slice(-8);
    }

    async hashPassword(password: string): Promise<string> {
        return await hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            homeAddress,
            paymentInfo,
            password,
            isSubscribed
        } = user;
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !password
        ) {
            throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) throw new HttpException('An account with that email already exists.', HttpStatus.CONFLICT); 

        const hashedPassword = await this.hashPassword(password);
        const activationCode = this.makeActivationCode();
        const newUser = await this.userService.create(
            USER_TYPE_USER,
            firstName,
            lastName,
            email,
            phoneNumber,
            homeAddress,
            paymentInfo,
            hashedPassword,
            isSubscribed,
            false,
            activationCode
        );

        console.log('Sending verification mail...')

        await this.mailService.sendConfirmationCodeEmail(email, activationCode);

        return this.userService._getUserDetails(newUser);
    }

    async changePassword(email: string, newPassword: string): Promise<UserDetails | any> {
        const hashedPassword = await this.hashPassword(newPassword);
        const updatedUser = await this.userService.changePassword(email, hashedPassword);
        return this.userService._getUserDetails(updatedUser);
    }

    async resetPassword(email: string): Promise<UserDetails | null> {
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;
        if (!doesUserExist) return null;
        const temporaryPassword = this.makeTemporaryPassword();
        await this.mailService.sendTemporaryPasswordEmail(email, temporaryPassword);
        const hashedPassword = await this.hashPassword(temporaryPassword);
        const updatedUser = await this.userService.changePassword(email, hashedPassword);
        return this.userService._getUserDetails(updatedUser);
    }

    async updateUserProfile(newUserData: UpdateUserDTO): Promise<UserDetails | any> {
        const { email, newFirstName, newLastName, newPhoneNumber, newHomeAddress, newIsSubscribed } = newUserData;
        const updatedUser = await this.userService.updateUserProfile(email, newFirstName, newLastName, newPhoneNumber, newHomeAddress, newIsSubscribed);

        // TODO: Send update profile email

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
        if (!user.isActive) throw new HttpException('You have not verified your account.', HttpStatus.UNAUTHORIZED);
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

    async verifyEmail(activationCode: string, email: string) {
        const user = await this.userService.findByEmail(email);
        if (user.activationCode !== activationCode) throw new HttpException('Invalid Activation Code.', HttpStatus.UNAUTHORIZED);
        return this.userService.activateUser(email);
    }

    async validateApiKey(apiKey: string): Promise<boolean> {
        return apiKey === process.env.API_KEY;
    }
}
