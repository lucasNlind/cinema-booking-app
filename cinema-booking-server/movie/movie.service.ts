import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        cast: Array<string>,
        director: string,
        producer: string,
        summary: string,
        reviews: Array<string>,
        moviePosterUrl: string,
        trailerUrl: string,
        showDates: Array<number>,
        rating: string
    ): Promise<MovieDocument> {
        const newMovie = new this.movieModel({
            title,
            category,
            cast,
            director,
            producer,
            summary,
            reviews,
            moviePosterUrl,
            trailerUrl,
            showDates,
            rating
        });
        return newMovie.save();
    }

    async fetchMovie(movieId: string): Promise<MovieDocument> {
        const movie = await this.movieModel.findById({ movieId }).exec();
        if (!movie) throw new HttpException('[ERROR] Unable to find resource.', HttpStatus.BAD_REQUEST);
        return movie;
    }

    async fetchAllMovies(): Promise<MovieDocument[]> {
        const movies = await this.movieModel.find().exec();
        return movies;
    }

}
