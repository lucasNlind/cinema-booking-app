import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { ShowModule } from './show/show.module';
import { PromotionModule } from './promotion/promotion.module';
<<<<<<< HEAD
import { RoomModule } from './room/room.module';
=======
import { MovieModule } from './movie/movie.module';
>>>>>>> 30f38fcb7dbd847948f8ee73b06d0f40577f60a7

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cinema-booking-app'),
    UserModule,
    BookingModule,
    TicketModule,
    AuthModule,
    ShowModule,
    PromotionModule,
<<<<<<< HEAD
    RoomModule
=======
    MovieModule
>>>>>>> 30f38fcb7dbd847948f8ee73b06d0f40577f60a7
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
