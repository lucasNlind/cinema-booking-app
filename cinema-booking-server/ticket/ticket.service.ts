import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDocument } from './ticket.schema';

@Injectable()
export class TicketService {

    constructor(
        @InjectModel('Ticket')
        private readonly ticketModel: Model<TicketDocument>
    ) {}

    async create(
        type: string,
        price: number,
        bookingId: string,
        seatNumber: string
    ): Promise<TicketDocument> {
        const newTicket = new this.ticketModel({ type, price, bookingId, seatNumber });
        return newTicket.save();
    }


}
