import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserService } from 'cinema-booking-server/user/user.service';
import { PromotionService } from 'cinema-booking-server/promotion/promotion.service';
import { Payment } from 'cinema-booking-server/user/dto/user-payment-info.dto';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService) {}

    @Post('promotion')
    sendPromotionalEmail(): Promise<void> {
        return this.mailService.sendPromotionEmails();
    }

    @Post('confirm-order')
    sendOrderConfirmationEmail(
        @Body('email') email: string,
        @Body('movieTitle') movieTitle: string,
        @Body('totalPrice') totalPrice: number,
        @Body('paymentInfo') paymentInfo: Payment,
        @Body('selectedSeats') selectedSeats: Array<string>
    ): Promise<void> {
        return this.mailService.sendOrderConfirmationEmail(email, movieTitle, totalPrice, paymentInfo, selectedSeats);
    }

}
