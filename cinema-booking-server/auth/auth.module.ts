import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'cinema-booking-server/mail/mail.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: `VCidkWaM9KxkQFzKVigBZwP4TujgeF`,
        signOptions: { expiresIn: '3600s'}
      })
    }),
    PassportModule,
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
