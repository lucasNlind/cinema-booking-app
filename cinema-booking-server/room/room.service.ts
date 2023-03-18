import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDocument } from './room.schema';

@Injectable()
export class RoomService {

    constructor(
        @InjectModel(Room)
        private readonly RoomModel: Model<> 
    )
}
