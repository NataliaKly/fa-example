import { Module } from "@nestjs/common";
import { DbModule } from "../../db/db.module";
import { CategoriesController } from "./categories.controller";

@Module({
  imports: [DbModule],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
