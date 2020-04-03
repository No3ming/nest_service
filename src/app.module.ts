import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from './posts/post.module';
import { TagsModule } from './tags/tags.module';
import { ConfigService } from './config/config.service';
import { OssModule } from './oss/oss.module';
import { ConfigModule } from './config/config.module';
import { OutlineService } from './outline/outline.service';
import { OutlineModule } from './outline/outline.module';

const confg = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`)
console.log(confg.get('DATABASE_HOST'))
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(`${confg.get('DATABASE_HOST')}`),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      debug: false,
      playground: true, // 开启调试界面
      autoSchemaFile: confg.get('SCHEMA_PATH'), // 放个该名字的空文件，底层会读取Nest形式的schema然后生成graphql原始的sehema里面
      installSubscriptionHandlers: true // 使用订阅就要开启这个参数
    }),
    PostModule,
    TagsModule,
    OssModule,
    ConfigModule,
    OutlineModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule { }
