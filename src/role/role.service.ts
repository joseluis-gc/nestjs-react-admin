import {Get, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "./models/role.entity";
import {Repository} from "typeorm";
import {User} from "../user/models/user.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private readonly roleRepository:Repository<RoleEntity>
    ) {
    }

    @Get()
    async all() : Promise<RoleEntity[]>{
        return this.roleRepository.find();
    }


    async create(data) : Promise<RoleEntity>{
        return this.roleRepository.save(data);
    }

    async findOne(condition) : Promise<RoleEntity>{
        return this.roleRepository.findOne(condition);
    }

    async update(id:number, data) : Promise<any>{
        return this.roleRepository.update(id,data);
    }

    async delete(id:number) : Promise<any>{
        return this.roleRepository.delete(id);
    }


}
