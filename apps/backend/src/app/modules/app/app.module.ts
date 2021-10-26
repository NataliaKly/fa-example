import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { appConfig } from "../../config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CostsModule } from "./costs/costs.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "frontend"),
      exclude: ["/api*"]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("db.url"),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        dropSchema: false,
        ssl: configService.get<boolean>("production") && {
          rejectUnauthorized: false
        }
      })
    }),
    CostsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
