import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../common/providers/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionEntity } from '../../../common/providers/entities/session.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async createSession(session: SessionEntity): Promise<SessionEntity> {
    return this.sessionRepository.save(session);
  }

  async deleteSession(id: string): Promise<boolean> {
    const { affected } = await this.sessionRepository.delete({ id });

    return affected === 1;
  }
}
