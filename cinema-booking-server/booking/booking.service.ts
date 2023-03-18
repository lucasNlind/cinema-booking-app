import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDocument } from './booking.schema';

@Injectable()
export class BookingService {

    constructor(
        @InjectModel('Booking')
        private readonly bookingModel: Model<BookingDocument>
    ) {}

    async create (
        userId: string,
        paymentId: string,
        showId: string,
        promotionId: string,
        total: number
    ): Promise<BookingDocument> {
        const newBooking = new this.bookingModel({
            userId,
            paymentId,
            showId,
            promotionId,
            total
        });
        return newBooking.save();
    }

}
