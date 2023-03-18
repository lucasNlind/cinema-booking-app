import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    
    @Prop({ required: true })
    roomName: string;

    @Prop({ required: true })
    capacity: number;

}

export const RoomSchema = SchemaFactory.createForClass(Room);