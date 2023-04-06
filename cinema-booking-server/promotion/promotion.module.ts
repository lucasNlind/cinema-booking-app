import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { PromotionController } from './promotion.controller';
import { PromotionSchema } from './promotion.schema';
import { PromotionService } from './promotion.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Promotion', schema: PromotionSchema}]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService]
})
export class PromotionModule {}
