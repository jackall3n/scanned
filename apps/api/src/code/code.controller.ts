import { Controller, Post } from "@nestjs/common";
import { PrismaService } from "@scanned/db";

@Controller('codes')
export class CodeController {
  constructor(private prisma: PrismaService) {
  }

  @Post()
  async create() {
    return this.prisma.code.create({
      data: {}
    })
  }
}
