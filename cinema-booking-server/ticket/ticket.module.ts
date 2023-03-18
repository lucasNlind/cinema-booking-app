import { Module } from '@nestjs/common';
import { TicketSchema } from './ticket.schema';
import { TicketService } from './ticket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
