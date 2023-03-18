import { BookingDocument } from './booking.schema';
import { BookingService } from './booking.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('booking')
export class BookingController {

    constructor(private bookingService: BookingService) {}

    @Post()
    postBooking(
        @Body('userId') userId: string,
        @Body('paymentId') paymentId: string,
        @Body('showId') showId: string,
        @Body('promotionId') promotionId: string,
        @Body('total') total: number
    ): Promise<BookingDocument> {
        return this.bookingService.create(
            userId,
            paymentId,
            showId,
            promotionId,
            total
        )
    }

}
