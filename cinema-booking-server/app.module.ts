import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cinema-booking-app'),
    UserModule,
    BookingModule,
    TicketModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
