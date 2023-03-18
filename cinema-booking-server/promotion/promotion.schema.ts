import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type PromotionDocument = Promotion & Document;

@Schema()
export class Promotion {

    @Prop({ required: true })
    promotionCode: string;

    @Prop({ required: true})
    discountPercentage: number;

}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);