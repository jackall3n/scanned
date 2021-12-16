import { Module } from '@nestjs/common';
import { PrismaModule } from "@scanned/db";

import { AppController } from './app.controller';
import { CodeModule } from "./code/code.module";
import { ScanModule } from "./scan/scan.module";
import { AssetModule } from "./asset/asset.module";

@Module({
  imports: [PrismaModule, CodeModule, AssetModule, ScanModule],
  controllers: [AppController],
})
export class AppModule {
}
