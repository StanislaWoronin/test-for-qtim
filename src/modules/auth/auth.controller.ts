import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { authEndpoint } from '../../common/constants/endpoints/auth.endpoint';
import {
  ApiLogin,
  ApiRegistration,
} from '../../common/documentations/auth-decorators';
import { LoginCommand, RegistrationCommand } from './commands';
import { CheckCredentialGuard } from '../../common/guards/check-credential.guard';
import { CurrentUserId } from '../../common/decorators/current-user-id.decorator';
import { Metadata } from '../../common/decorators/metadata.decorator';
import { TCreatedTokens } from '../../common/shared/types/created-tokens.type';
import { LoginDto, RegistrationDto } from './dto';

@Controller(authEndpoint.default)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(authEndpoint.login)
  @UseGuards(CheckCredentialGuard)
  @ApiLogin()
  async login(
    @CurrentUserId() userId: string,
    @Body() dto: LoginDto,
    @Metadata() browser: string,
  ): Promise<TCreatedTokens> {
    return await this.commandBus.execute(
      new LoginCommand({ browser, id: userId }),
    );
  }

  @Post(authEndpoint.registration)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRegistration()
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(dto),
    );
  }
}
