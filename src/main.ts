import { ConsoleLogger, Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class StatusController {
  @Get('/status')
  status() {
    return { status: 'ok' };
  }
}

@Module({ controllers: [StatusController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({ json: true, colors: true }),
  });
  await app.listen(3000);
}

bootstrap().catch(console.error);
