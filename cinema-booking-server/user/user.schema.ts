
import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    isSubscribed: boolean;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: true })
    homeAddress: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
