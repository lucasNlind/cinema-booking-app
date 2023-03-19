import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDocument } from './room.schema';

@Injectable()
export class RoomService {

    constructor(
        @InjectModel('Room')
        private readonly RoomModel: Model<RoomDocument> 
    ) {}

    async create (
        roomName: string,
        capacity: number
    ): Promise<RoomDocument> {

        const newRoom = new this.RoomModel({
            roomName,
            capacity
        })

        return newRoom.save();
    }

}
