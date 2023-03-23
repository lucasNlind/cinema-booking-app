import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateUserDTO } from 'cinema-booking-server/user/dto/update-user.dto';
import { Address } from 'cinema-booking-server/user/dto/user-address.dto';
import { UserDocument } from 'cinema-booking-server/user/user.schema';

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
    changePassword(
        @Body('email') email: string,
        @Body('currentPassword') currentPassword: string,
        @Body('newPassword') newPassword: string
    ): Promise<UserDetails | null> {
        return this.authService.changePassword(email, currentPassword, newPassword);
    }

    @Patch('reset-password')
    @HttpCode(HttpStatus.OK)
    resetPassword(@Body('email') email: string): Promise<UserDetails | null> {
        return this.authService.resetPassword(email);
    }

    @Patch('update-profile')
    @HttpCode(HttpStatus.OK)
    updateUserProfile(@Body() newUserData: UpdateUserDTO): Promise<UserDetails | null> {
        return this.authService.updateUserProfile(newUserData);
    }

    @Post('add-payment')
    @HttpCode(HttpStatus.OK)
    addPayment(
        @Body('email') email: string,
        @Body('billingAddress') billingAddress: Address,
        @Body('cardNumber') cardNumber: string,
        @Body('expirationDate') expirationDate: string,
        @Body('cardHolderName') cardHolderName: string,
        @Body('cvv') cvv: string
    ): Promise<UserDocument | null> {
        return this.authService.addPayment(email, billingAddress, cardNumber, expirationDate, cardHolderName, cvv);
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

    @Patch('remove-payment/:paymentId')
    @HttpCode(HttpStatus.OK)
    removePaymentMethod(@Param('paymentId') paymentId: string, @Body('email') email: string): Promise<UserDocument | null> {
        return this.authService.removePaymentMethod(paymentId, email);
    }
}
