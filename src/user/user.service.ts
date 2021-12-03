import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./models/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly UserRepository : Repository<User>
    ) {
    }

    async all() : Promise<User[]> {
        return await this.UserRepository.find();
    }

    async paginate(page = 1) : Promise<any> {
        const take = 1;

        const [users,total] = await this.UserRepository.findAndCount({
            take,
            skip: (page - 1) * take
        });

        return {
            data:users.map(user => {
                const {password, ...data} = user;
                return data;
            }),
            meta:{
                total,
                page,
                last_page: Math.ceil(total/take)
            }
        }
    }


    async create(data) : Promise<User>{
        return this.UserRepository.save(data);
    }

    async findOne(condition) : Promise<User>{
        return this.UserRepository.findOne(condition);
    }

    async update(id:number, data) : Promise<any>{
        return this.UserRepository.update(id,data);
    }

    async delete(id:number) : Promise<any>{
        return this.UserRepository.delete(id);
    }


}
