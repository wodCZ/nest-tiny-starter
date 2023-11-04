import { NestFactory } from "@nestjs/core";
import { Controller, Get, Injectable, Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
class PrismaService extends PrismaClient {}

@Controller()
class PostsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get("/posts")
  findPosts() {
    return this.prismaService.post.findMany();
  }
}

@Module({
  controllers: [PostsController],
  providers: [PrismaService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap().catch(console.error);
