import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { RoomController } from './room.controller';
import { RoomSchema } from './room.schema'; 
import { RoomService } from './room.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Room", schema: RoomSchema}]),
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
