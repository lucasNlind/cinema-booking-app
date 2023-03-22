import * as sgMail from '@sendgrid/mail';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    async sendConfirmationCodeEmail(targetEmail: string, activationCode: string) {

        sgMail.setApiKey('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');

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

        sgMail.setApiKey('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');

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

}
