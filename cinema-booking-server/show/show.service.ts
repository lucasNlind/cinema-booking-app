import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowDocument } from './show.schema';

@Injectable()
export class ShowService {

    constructor(
        @InjectModel('Show')
        private readonly ShowModel: Model<ShowDocument>
    ) {}

    async create (
        movieId: string,
        roomId: string,
        dateTime: number
    ): Promise<ShowDocument> {

        const newShow = new this.ShowModel({
            movieId,
            roomId,
            dateTime
        })

        return newShow.save();
    }

}
