import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'john_doe',
    description: 'The unique username of the user',
    required: false,
  })
  username?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email of the user',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: UserRole.USER,
    enum: UserRole,
    description: 'The role of the user',
    required: false,
  })
  role?: UserRole;
}
