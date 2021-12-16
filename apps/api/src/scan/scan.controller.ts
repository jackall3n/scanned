import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PrismaService } from "@scanned/db";

@Controller('scan')
export class ScanController {
  constructor(private prisma: PrismaService) {
  }

  @Get(':id')
  async scan(@Param('id') id: string, @Res() response: Response) {
    const code = await this.prisma.code.findFirst({
      include: {
        asset: {
          select: {
            id: true,
            links: true
          }
        }
      },
      where: { id }
    });

    const { asset } = code;

    if (!asset) {
      return {
        status: 'not implemented'
      }
    }

    await this.prisma.asset.update({
      data: {
        views: {
          increment: 1
        }
      },
      where: {
        id: asset.id
      }
    })

    const { links } = asset;

    if (links?.length === 1) {
      const [link] = links;

      response.redirect(link.href);

      return;
    }

    return asset
  }
}
