import { MovieDocument } from './movie.schema';
import { MovieService } from './movie.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) {}

    @Post()
    postMovie(
        @Body('title') title: string,
        @Body('category') category: string,
        @Body('cast') cast: Array<string>,
        @Body('director') director: string,
        @Body('producer') producer: string,
        @Body('summary') summary: string,
        @Body('reviews') reviews: Array<string>,
        @Body('moviePosterUrl') moviePosterUrl: string,
        @Body('trailerUrl') trailerUrl: string,
        @Body('showDates') showDates: Array<number>,
        @Body('rating') rating: string
    ): Promise<MovieDocument> {
        console.log(title, category, cast, director, producer, summary, reviews, moviePosterUrl, trailerUrl, showDates, rating)
        return this.movieService.create(
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
        )
    }

    @Get('fetch/:movieId')
    getMovieById(@Param('movieId') movieId: string): Promise<MovieDocument> {
        return this.movieService.fetchMovie(movieId);
    }

    @Get('fetch-all')
    getAllMovies(): Promise<MovieDocument[]> {
        return this.movieService.fetchAllMovies();
    }
}
