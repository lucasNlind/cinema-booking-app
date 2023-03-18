import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    bookingId: string;

    @Prop({ required: true })
    seatNumber: string;

}

export const TicketSchema = SchemaFactory.createForClass(Ticket);