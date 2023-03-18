import { Body, Controller, Controller, Post } from '@nestjs/common'
import { RoomDocument } from './room.schema';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

    constructor(private RoomService: RoomService) {}

    @Post()
    postRoom(
        @Body('roomName') roomName: string,
        @Body('capacity') capacity: number
    ): Promise<RoomDocument> {
        return this.RoomService.create(
            roomName,
            capacity
        );
    }
    
}
