import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Address } from './dto/user-address.dto';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDocument | null> {
        return this.userService.findById(id);
    }

}
