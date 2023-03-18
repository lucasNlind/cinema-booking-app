import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {}
