import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieDocument } from './movie.schema';
import { InjectModel } from '@nestjs/mongoose';

const ONE_MONTH_IN_MILLIS = 2629746000;

@Injectable()
export class MovieService {

    constructor(
        @InjectModel('Movie')
        private readonly movieModel: Model<MovieDocument>
    ) {}

    async validateNewShowDates(showDates: Array<number>): Promise<void> {
        const allMovieShowDates = await this.fetchAllMovieShowDates();
        for (const showDate of showDates) {
            if (allMovieShowDates.includes(showDate)) throw new HttpException('[ERROR] Overlapping show date.', HttpStatus.BAD_REQUEST);
        }
    }

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

        await this.validateNewShowDates(showDates);

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
        const movie = await this.movieModel.findById(movieId).exec();
        if (!movie) throw new HttpException('[ERROR] Unable to find resource.', HttpStatus.BAD_REQUEST);
        return movie;
    }

    async fetchAllMovies(): Promise<MovieDocument[]> {
        const movies = await this.movieModel.find().exec();
        return movies;
    }

    async fetchAllMoviesShowingNow(): Promise<MovieDocument[]> {
        const dateNowInMillis = Date.now();
        const existingMovies = await this.fetchAllMovies();
        const moviesShowingNow = existingMovies.filter((existingMovie) => {
            const hasShowDateWithinNextMonth = (showDate) => showDate < dateNowInMillis + ONE_MONTH_IN_MILLIS;
            return existingMovie.showDates.some(hasShowDateWithinNextMonth);
        });
        return moviesShowingNow;
    }

    async fetchAllMoviesComingSoon(): Promise<MovieDocument[]> {
        const dateNowInMillis = Date.now();
        const existingMovies = await this.fetchAllMovies();
        const moviesShowingSoon = existingMovies.filter((existingMovie) => {
            const hasShowDateAfterNextMonth = (showDate) => showDate > dateNowInMillis + ONE_MONTH_IN_MILLIS;
            return existingMovie.showDates.some(hasShowDateAfterNextMonth);
        });
        return moviesShowingSoon;
    }

    async fetchAllMovieShowDates(): Promise<number[]> {
        const movies = await this.fetchAllMovies();
        let allShowDates = []
        for (const movie of movies) {
            const showDates = movie.showDates;
            allShowDates = [...allShowDates, ...showDates];
        }
        return allShowDates;
    }

    async addMovieShowDate(movieId: string, newShowDate: number): Promise<MovieDocument> {
        await this.validateNewShowDates([newShowDate]);
        const existingMovie = await this.movieModel.findById(movieId).exec();
        if (!existingMovie) throw new HttpException('[ERROR] Unable to find resource.', HttpStatus.BAD_REQUEST);
        const existingMovieShowDates = existingMovie.showDates;
        existingMovie.showDates = [...existingMovieShowDates, newShowDate];
        return existingMovie.save();
    }

    async removeMovieShowDate(movieId: string, newShowDates: Array<number>): Promise<MovieDocument> {
        const existingMovie = await this.movieModel.findById(movieId).exec();
        if (!existingMovie) throw new HttpException('[ERROR] Unable to find resource.', HttpStatus.BAD_REQUEST);
        existingMovie.showDates = newShowDates ?? existingMovie.showDates;
        return existingMovie.save();
    }

    async deleteMovie(movieId: string) {
        await this.movieModel.deleteOne({ _id: movieId }).exec();
    }

}
