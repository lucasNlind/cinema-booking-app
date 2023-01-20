import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ServeStaticModule} from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
