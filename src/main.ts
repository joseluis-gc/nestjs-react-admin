import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');//all routes to api/route
  app.useGlobalPipes(new ValidationPipe());//to use class validator
  app.use(cookieParser());
  app.enableCors(
      {
          origin:"http://localhost:3000",
          credentials:true
      }
  );
  await app.listen(3000);
}
bootstrap();
