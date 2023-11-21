import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig, swaggerConfig } from './common/configurations';
import { ConfigService } from '@nestjs/config';
import { environmentConstant } from './common/constants/environment.constant';
import { Logger } from '@nestjs/common';
import { swaggerEndpoint } from './common/constants/endpoints/swagger.endpoint';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(environmentConstant.port);

  await app.listen(port, () => {
    Logger.log(
      `Swagger documentation on http://localhost:${port}/${swaggerEndpoint}`,
      'main',
    );
  });
}
bootstrap();
