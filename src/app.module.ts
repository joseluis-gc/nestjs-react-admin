import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_admin',
      //entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
      UserModule,
      AuthModule,
      CommonModule,
      RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
