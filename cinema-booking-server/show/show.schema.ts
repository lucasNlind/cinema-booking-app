
import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type ShowDocument = Show & Document;

@Schema()
export class Show {

    @Prop({ required: true })
    movieId: string;

    @Prop({ required: true })
    roomId: string;

    @Prop({ required: true })
    dateTime: string;

}

export const ShowSchema = SchemaFactory.createForClass(Show);