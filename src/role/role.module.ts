import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/models/user.entity";
import {CommonModule} from "../common/common.module";
import {RoleEntity} from "./models/role.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([RoleEntity]),
    CommonModule
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
