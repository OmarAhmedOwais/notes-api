import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The unique username of the user',
  })
  @IsString({ message: 'username must be a string' })
  @Length(3, 20)
  readonly username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email of the user',
  })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString({ message: 'password must be a string' })
  @Length(6, 30)
  readonly password: string;

  @ApiProperty({
    example: UserRole.USER,
    enum: UserRole,
    description: 'The role of the user',
    required: false,
  })
  @IsString({ message: 'role must be a string' })
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
