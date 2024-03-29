import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { PromotionDocument } from './promotion.schema';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {

    constructor(private promotionService: PromotionService) {}

    @Post()
    postPromotion(
        @Body('promotionCode') promotionCode: string,
        @Body('discountPercentage') discountPercentage: number
    ): Promise<PromotionDocument> {
        return this.promotionService.create(
            promotionCode,
            discountPercentage
        );
    }

    @Post('/verify/:promotionCode')
    verifyPromotion(@Param('promotionCode') promotionCode: string): Promise<number> {
        console.log('promotionCode: ', promotionCode);
        return this.promotionService.validatePromotionCode(promotionCode);
    }

    @Get('fetch-all')
    getAllPromotions(): Promise<PromotionDocument[]> {
        return this.promotionService.fetchAllPromotions();
    }

    @Delete('delete/:promotionId')
    deletePromotion(@Param('promotionId') promotionId: string) {
        return this.promotionService.deletePromotion(promotionId);
    }

}
