import * as sgMail from '@sendgrid/mail';


import { UserService } from 'cinema-booking-server/user/user.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PromotionService } from 'cinema-booking-server/promotion/promotion.service';

@Injectable()
export class MailService {

    @Inject(UserService)
    private readonly userService: UserService;

    @Inject(PromotionService)
    private readonly promotionService: PromotionService;

    async sendPromotionEmails(): Promise<void> {

        const userEmails = await this.userService.fetchAllSubscribedUserEmails();

        if (!userEmails.length) return;

        const promotions = await this.promotionService.fetchAllPromotions();

        console.log('userEmails: ', userEmails);
        console.log('promotions: ', promotions);

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const subject = '[CINEMA BOOKING APP] - Promotions';
        let htmlMain = '<p>Since you are subscribed to receive promotions, please use the following codes next time you check out!</p>';

        for (const promotion of promotions) {
            htmlMain += `<p>Promotion Code: <strong>${promotion.promotionCode}</strong>, Discount Percentage: <strong>%${promotion.discountPercentage}</strong></p>`
        }

        const msg = {
            to: userEmails,
            from: 'lnl29512@uga.edu',
            subject: subject,
            text: 'Your confirmation code',
            html: htmlMain
        };

        try {
            await sgMail.sendMultiple(msg);
            console.log()
        } catch (error) {
            console.log(error);
            console.log('Error sending promotion mail.');
        }

    }

    async sendConfirmationCodeEmail(targetEmail: string, activationCode: string) {

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const subject = '[CINEMA BOOKING APP] - Confirm Email';
        const htmlMain = `<p>Activation Code: <strong>${activationCode}</strong></p>`

        const msg = {
            to: targetEmail,
            from: 'lnl29512@uga.edu',
            subject: subject,
            text: 'Your confirmation code',
            html: htmlMain
        }

        try {
            await sgMail.send(msg);
            console.log('Successfully sent activation code.')
            return {
                statusCode: 200,
                message: 'Success'
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Error sending confirmation mail', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendTemporaryPasswordEmail(targetEmail: string, temporaryPassword: string) {

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const subject = '[CINEMA BOOKING APP] - Password Reset';
        const htmlMain = `<p>Your temporary password: <strong>${temporaryPassword}</strong></p>`

        const msg = {
            to: targetEmail,
            from: 'lnl29512@uga.edu',
            subject: subject,
            text: 'Your temporary password',
            html: htmlMain
        }

        try {
            await sgMail.send(msg);
            console.log('Successfully sent temporary password.')
            return {
                statusCode: 200,
                message: 'Success'
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Error sending temporary password mail', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendProfileUpdateInformation(targetEmail: string) {
        
        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const subject = '[CINEMA BOOKING APP] - Profile Change';
        const htmlMain = `<p>This message is to inform you that your profile information has changed.</strong></p>`

        const msg = {
            to: targetEmail,
            from: 'lnl29512@uga.edu',
            subject: subject,
            text: 'Your account details',
            html: htmlMain
        }

        try {
            await sgMail.send(msg);
            console.log('Successfully sent profile update confirmation.')
            return {
                statusCode: 200,
                message: 'Success'
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Error sending profile update mail', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
