import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    paymentId: string;

    @Prop({ required: true })
    showId: string;

    @Prop({ required: true })
    promotionId: string;

    @Prop({ required: true })
    total: number;

}

export const BookingSchema = SchemaFactory.createForClass(Booking);
