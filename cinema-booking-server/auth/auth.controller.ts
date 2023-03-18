import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
        return this.authService.login(user);
    }

    @Patch('change-password')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    changePassword(@Body('email') email: string, @Body('newPassword') newPassword: string): Promise<UserDetails | null> {
        return this.authService.changePassword(email, newPassword);
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string }) {
        return this.authService.verifyJwt(payload.jwt);
    }
}
