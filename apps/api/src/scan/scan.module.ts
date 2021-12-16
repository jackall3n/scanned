import { Module } from "@nestjs/common";
import { ScanController } from "./scan.controller";

@Module({
  imports: [],
  controllers: [ScanController]
})
export class ScanModule {

}
