import { Module } from "@nestjs/common";
import { AssetController } from "./asset.controller";

@Module({
  imports: [],
  controllers: [AssetController]
})
export class AssetModule {
}
