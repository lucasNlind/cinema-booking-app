import { Controller, Inject, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserService } from 'cinema-booking-server/user/user.service';
import { PromotionService } from 'cinema-booking-server/promotion/promotion.service';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService) {}

    @Post('promotion')
    sendPromotionalEmail(): Promise<void> {
        return this.mailService.sendPromotionEmails();
    }

}
