import { Body, Controller, Post } from '@nestjs/common';
import { MovieDocument } from './movie.schema';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {

    constructor(private movieService: MovieService) {}

    @Post()
    postMovie(
        @Body('title') title: string,
        @Body('category') category: string,
        @Body('director') director: string,
        @Body('producer') producer: string,
        @Body('summary') summary: string,
        @Body('review') review: string,
        @Body('showDate') showDate: number,
        @Body('moviePosterUrl') moviePosterUrl: string,
        @Body('trailerUrl') trailerUrl: string,
        @Body('rating') rating: number
    ): Promise<MovieDocument> {
        return this.movieService.create(
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
        )
    }
}
