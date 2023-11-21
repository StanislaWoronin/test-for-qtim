import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../common/providers/entities/user.entity';
import { Repository } from 'typeorm';
import { WithId } from '../../../common/shared/types/with-id';
import { TMetadata } from '../../../common/shared/types/metadata.type';
import { SessionEntity } from '../../../common/providers/entities/session.entity';

@Injectable()
export class AuthQueryRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserViaEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async emailExists(email: string): Promise<boolean> {
    return this.userRepository.exist({ where: { email } });
  }

  async findSessionViaBrowser({
    id,
    browser,
  }: WithId<TMetadata>): Promise<string> {
    const session = await this.sessionRepository
      .createQueryBuilder('session')
      .innerJoin('session.user', 'user')
      .where('user.id = :userId', { userId: id })
      .andWhere('session.browser = :browser', { browser })
      .select('session.id')
      .getOne();
    console.log({ session });
    return session.id;
  }

  async findSessionViaCreatedAt(
    userId: string,
    createdAt: number,
  ): Promise<SessionEntity> {
    return this.sessionRepository
      .createQueryBuilder('session')
      .innerJoin('session.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('session.createdAt = :createdAt', { createdAt })
      .getOne();
  }
}
