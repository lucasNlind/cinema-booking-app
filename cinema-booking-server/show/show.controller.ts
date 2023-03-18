import { Body, Controller, Post } from '@nestjs/common';
import { ShowDocument } from './show.schema';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {

    constructor(private ShowService: ShowService) {}

    @Post()
    postShow(
        @Body('movieId') movieId: string,
        @Body('roomId') roomId: string,
        @Body('dateTime') dateTime: number
    ): Promise<ShowDocument> {
        return this.ShowService.create(
            movieId,
            roomId,
            dateTime
        );
    }

}