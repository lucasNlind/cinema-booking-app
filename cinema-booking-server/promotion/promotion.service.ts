import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromotionDocument } from './promotion.schema';

@Injectable()
export class PromotionService {

    constructor(
        @InjectModel('Promotion')
        private readonly PromotionModel: Model<PromotionDocument>    
    ) {}

    async create (
        promotionCode: string,
        discountPercentage: number
    ): Promise<PromotionDocument> {

        const newPromotion = new this.PromotionModel({
            promotionCode,
            discountPercentage
        })

        return newPromotion.save();
    }

}