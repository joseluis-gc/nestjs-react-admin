import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards, UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {RegisterDto} from "./models/register.dto";
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from "express";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth.guard";

@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)// so it wont return password Exclude() on user.entity.ts
@Controller()//removed prefix
export class AuthController {

    constructor(private userService : UserService, private jwtService : JwtService) {
    }

    @Post('register')
    async register(@Body() body : RegisterDto){

        if(body.password !== body.password_confirm){
            throw new BadRequestException('Passwords do not match');
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return this.userService.create(
            {
                first_name:body.first_name,
                last_name:body.last_name,
                email:body.email,
                password:hashed,
            }
        );
        //return this.userService.create(body);
    }


    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res({passthrough:true})response: Response
        //@Res()response: Response
    ){

        const user = await this.userService.findOne({email});

        if(!user){
            throw new NotFoundException("User not found");
        }

        if(!await  bcrypt.compare(password, user.password)){
            throw new BadRequestException("Invalid Credentials.");
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt,{httpOnly:true})

        return user

    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request : Request){
        const cookie = request.cookies['jwt']; //npm install cookie parser and add in main.ts

        const data = await this.jwtService.verifyAsync(cookie);

        //return data;

        return this.userService.findOne({id:data['id']});

    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true})response: Response){
        response.clearCookie("jwt");

        return {
            message:"Logged out :)"
        }

    }


}
