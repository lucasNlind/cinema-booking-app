import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowController } from './show.controller';
import { ShowSchema } from './show.schema';
import { ShowService } from './show.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Show', schema: ShowSchema }]),
  ],
  controllers: [ShowController],
  providers: [ShowService]
})
export class ShowModule {}