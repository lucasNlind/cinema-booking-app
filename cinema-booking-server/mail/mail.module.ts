import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { UserModule } from 'cinema-booking-server/user/user.module';
import { PromotionModule } from 'cinema-booking-server/promotion/promotion.module';

@Module({
  imports: [UserModule, PromotionModule],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
