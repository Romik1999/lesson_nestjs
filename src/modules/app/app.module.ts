import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from '../users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import configurations from "../../configurations";
import {User} from "../users/models/user.model";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations],
    }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService)=>({
                dialect: "postgres",
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                database: configService.get('db_name'),
                synchronize: true, //синхронизация
                autoLoadModels: true, //автозагрузка
                models:[User]
            })
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: []
})
export class AppModule {
}
