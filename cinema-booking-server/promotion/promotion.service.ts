import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromotionDocument } from './promotion.schema';

@Injectable()
export class PromotionService {

    constructor(
        @InjectModel('Promotion')
        private readonly promotionModel: Model<PromotionDocument>    
    ) {}

    async create (
        promotionCode: string,
        discountPercentage: number
    ): Promise<PromotionDocument> {

        const newPromotion = new this.promotionModel({
            promotionCode,
            discountPercentage
        })

        return newPromotion.save();
    }

    async fetchAllPromotions(): Promise<PromotionDocument[]> {
        const promotions = await this.promotionModel.find().exec();
        return promotions;
    }

}