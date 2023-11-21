import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import { SessionEntity } from './session.entity';
import { RegistrationDto } from '../../../modules/auth/dto/registration.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ length: 30 })
  createdAt: string = new Date().toISOString();

  @OneToMany(() => SessionEntity, (d) => d.user)
  sessions: SessionEntity[];

  static async create(data: RegistrationDto) {
    const result = Object.assign(new UserEntity(), data);
    result.passwordHash = await bcrypt.hash(data.password, 10);

    return result;
  }
}
