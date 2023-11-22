import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../common/use-cases/base.use-case';
import { AuthQueryRepository } from '../repositories/auth.query-repository';
import { BadRequestException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { UserEntity } from '../../../common/providers/entities/user.entity';
import { AuthDto } from '../dto';

export class RegistrationCommand {
  constructor(public readonly dto: AuthDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  extends BaseUseCase<RegistrationCommand, void>
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {
    super();
  }

  async executeUseCase({ dto }: RegistrationCommand): Promise<void> {
    const isExists = await this.authQueryRepository.emailExists(dto.email);
    if (isExists) throw new BadRequestException();

    const newUser = await UserEntity.create(dto);
    await this.authRepository.createUser(newUser);
    return;
  }
}
