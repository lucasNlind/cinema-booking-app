import { Body, Controller, Post } from '@nestjs/common'
import { PromotionDocument } from './promotion.schema';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {

    constructor(private PromotionService: PromotionService) {}

    @Post()
    postPromotion(
        @Body('promotionCode') promotionCode: string,
        @Body('discountPercentage') discountPercentage: number
    ): Promise<PromotionDocument> {
        return this.PromotionService.create(
            promotionCode,
            discountPercentage
        );
    }

}
