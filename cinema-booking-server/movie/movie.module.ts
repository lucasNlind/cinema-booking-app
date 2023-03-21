import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieSchema } from './movie.schema';
import { MovieService } from './movie.service';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
