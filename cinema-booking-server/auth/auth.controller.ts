import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from 'cinema-booking-server/user/dto/update-user.dto';

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

    @Patch('reset-password')
    @HttpCode(HttpStatus.OK)
    resetPassword(@Body('email') email: string): Promise<UserDetails | null> {
        return this.authService.resetPassword(email);
    }

    @Post('update-profile')
    @HttpCode(HttpStatus.OK)
    updateUserProfile(@Body() newUserData: UpdateUserDTO) {
        return this.authService.updateUserProfile(newUserData);
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    verifyEmail(@Body('activationCode') activationCode: string, @Body('email') email: string) {
        return this.authService.verifyEmail(activationCode, email);
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string }) {
        return this.authService.verifyJwt(payload.jwt);
    }
}
