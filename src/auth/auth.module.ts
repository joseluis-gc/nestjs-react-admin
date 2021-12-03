import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";
//import {JwtModule} from "@nestjs/jwt";
//import {jwtConstants} from './constants';

@Module({
  controllers: [AuthController],
  imports:[
      UserModule,
      CommonModule,
      /*
      JwtModule.register({
        //secret: jwtConstants.secret,
        secret: "secret",
        signOptions: { expiresIn: '1d' },
      }),
      */
  ]
})
export class AuthModule {}
