import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    postUser(
        @Body('type') type: string,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('homeAddress') homeAddress: string,
        @Body('isSubscribed') isSubscribed: boolean,
        @Body('isActive') isActive: boolean
    ): Promise<UserDocument> {
        return this.userService.create(
            type,
            firstName,
            lastName,
            email,
            password,
            homeAddress,
            isSubscribed,
            isActive
        );
    }

}
