import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService) {}

    @Post()
    testSend() {
        this.mailService.sendConfirmationCodeEmail('lucaslind7@gmail.com', '1234');
    }

}
