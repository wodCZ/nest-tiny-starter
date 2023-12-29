import { NestFactory } from "@nestjs/core";
import { Controller, Get, Inject, Injectable, Module } from "@nestjs/common";
import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class myClass {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setLocalCache(keyName: string, data: any) {
    try {
      const myObj = {
        data,
        timestamp: Date.now(),
      };
      const stringData = JSON.stringify(myObj);
      this.cacheManager.set(keyName, stringData, 14400000);
      console.log(await this.cacheManager.get(keyName));
    } catch (error) {
      console.error(error);
    }
  }

  async getLocalCache(keyName: string) {
    try {
      const localRate = await this.cacheManager.get<string>(keyName);
      console.log(localRate);
      return localRate ? JSON.parse(localRate) : null;
    } catch (error) {
      console.error(error);
    }
  }
}

@Controller()
class TestController {
  constructor(private readonly myClass: myClass) {}

  @Get("/test")
  async test() {
    this.myClass.setLocalCache("test", "test");
    setInterval(() => {
      this.myClass.getLocalCache("test");
    }, 1000);
  }
}

@Module({
  controllers: [TestController],
  imports: [CacheModule.register()],
  providers: [myClass],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().catch(console.error);
