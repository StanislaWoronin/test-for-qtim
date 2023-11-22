import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../../common/providers/entities/user.entity';

type TAuthDto = Pick<UserEntity, 'email'> & { password: string };

export class AuthDto implements TAuthDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'somemail@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
