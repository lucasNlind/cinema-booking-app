import { MovieDocument } from './movie.schema';
import { MovieService } from './movie.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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

    @Get('fetch-all/status/showing-now')
    getAllMoviesShowingNow(): Promise<MovieDocument[]> {
        return this.movieService.fetchAllMoviesShowingNow();
    }

    @Get('fetch-all/status/coming-soon')
    getAllMoviesComingSoon(): Promise<MovieDocument[]> {
        return this.movieService.fetchAllMoviesComingSoon();
    }

    @Patch('update/show-dates/remove/:movieId')
    removeMovieShowDate(
        @Param('movieId') movieId: string, 
        @Body('showDates') showDates: Array<number>
    ): Promise<MovieDocument> {
        return this.movieService.removeMovieShowDate(movieId, showDates);
    }

    @Patch('update/show-dates/add/:movieId')
    addMovieShowDate(
        @Param('movieId') movieId: string,
        @Body('newShowDate') newShowDate: number
    ): Promise<MovieDocument> {
        return this.movieService.addMovieShowDate(movieId, newShowDate);
    }

    @Delete('delete/:movieId')
    deleteMovie(@Param('movieId') movieId: string) {
        return this.movieService.deleteMovie(movieId);
    }
}
