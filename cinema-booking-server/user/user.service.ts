import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>
    ) {}

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user._id,
            type: user.type,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            homeAddress: user.homeAddress,
            isSubscribed: user.isSubscribed,
            isActive: user.isActive
        };
    }

    async create (
        type: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
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
            phoneNumber,
            password,
            homeAddress,
            isSubscribed,
            isActive
        })
        return newUser.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async changePassword(email: string, newPassword: string): Promise<UserDocument> {
        const existingUser = await this.findByEmail(email);
        if (!existingUser) throw new HttpException('Unable to find resource.', HttpStatus.NOT_FOUND);
        if (existingUser.password === newPassword) throw new HttpException('You have already used this password.', HttpStatus.BAD_REQUEST);
        existingUser.password = newPassword ?? existingUser.password;
        return existingUser.save();
    }

}
