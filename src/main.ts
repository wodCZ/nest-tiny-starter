import { NestFactory } from "@nestjs/core";
import { Controller, Get, Module } from "@nestjs/common";

@Controller()
class StatusController {
  @Get("/status")
  status() {
    return {
      status: "ok",
    };
  }
}

@Module({ controllers: [StatusController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().catch(console.error);
