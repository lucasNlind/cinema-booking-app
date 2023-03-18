import { TicketDocument } from './ticket.schema';
import { TicketService } from './ticket.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('ticket')
export class TicketController {

    constructor(private ticketService: TicketService) {}

    @Post()
    async create(
        @Body('type') type: string,
        @Body('price') price: number,
        @Body('bookingId') bookingId: string,
        @Body('seatNumber') seatNumber: string,
    ): Promise<TicketDocument> {
        return this.ticketService.create(type, price, bookingId, seatNumber);
    }

}
