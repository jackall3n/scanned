import { Module } from "@nestjs/common";
import { CodeController } from "./code.controller";

@Module({
  imports: [],
  controllers: [CodeController]
})
export class CodeModule {

}
