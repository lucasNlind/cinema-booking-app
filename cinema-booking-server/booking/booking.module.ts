import { Module } from '@nestjs/common';
import { BookingSchema } from './booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }])
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
