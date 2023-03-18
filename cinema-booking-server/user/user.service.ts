import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>
    ) {}

    async create (
        type: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        homeAddress: string,
        isSubscribed: boolean,
        isActive: boolean
    ): Promise<UserDocument> {

        const newUser = new this.userModel({
            type,
            firstName,
            lastName,
            email,
            password,
            homeAddress,
            isSubscribed,
            isActive
        })

        return newUser.save();
    }

}
