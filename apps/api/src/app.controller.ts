import { Controller, Get } from '@nestjs/common';
import { PrismaService } from "@scanned/db";

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {
  }

  @Get()
  async getData() {
    const codes = await this.prisma.code.findMany({
      include: {
        asset: {
          select: {
            links: true
          }
        }
      }
    });

    const assets = await this.prisma.asset.findMany({
      include: {
        links: true
      }
    });

    return { codes, assets };
  }
}
