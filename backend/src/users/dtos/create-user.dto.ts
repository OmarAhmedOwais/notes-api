import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsString({
    message: 'username must be a string',
  })
  @Length(3, 20)
  readonly username: string;

  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @IsString({
    message: 'password must be a string',
  })
  @Length(6, 30)
  readonly password: string;

  @IsString({
    message: 'role must be a string',
  })
  @IsEnum(['user', 'admin'])
  readonly role: UserRole;
}
