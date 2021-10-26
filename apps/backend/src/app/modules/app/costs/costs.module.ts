import { Module } from "@nestjs/common";
import { DbModule } from "../../db/db.module";
import { CostsController } from "./costs.controller";

@Module({
  imports: [DbModule],
  controllers: [CostsController]
})
export class CostsModule {}
