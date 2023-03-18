import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { MovieDocument } from './movie.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MovieService {

    constructor(
        @InjectModel('Movie')
        private readonly movieModel: Model<MovieDocument>
    ) {}

    async create(
        title: string,
        category: string,
        director: string,
        producer: string,
        summary: string,
        review: string,
        showDate: number,
        moviePosterUrl: string,
        trailerUrl: string,
        rating: number
    ): Promise<MovieDocument> {
        const newMovie = new this.movieModel({
            title,
            category,
            director,
            producer,
            summary,
            review,
            showDate,
            moviePosterUrl,
            trailerUrl,
            rating
        });
        return newMovie.save();
    }

}
