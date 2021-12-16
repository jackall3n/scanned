import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "@scanned/db";

@Controller('assets')
export class AssetController {
  constructor(private prisma: PrismaService) {
  }

  @Post()
  async create(@Body() assetDto: any) {
    const { links = [], ...asset } = assetDto;

    return this.prisma.asset.create({
      data: {
        ...asset,
        links: {
          createMany: {
            data: links
          }
        }
      }
    })
  }
}
