import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'The unique username of the user',
  })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The unique email of the user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: UserRole.USER,
    enum: UserRole,
    description: 'The role of the user',
  })
  @Expose()
  role: UserRole;

  @Exclude()
  password: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the user was created',
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the user was last updated',
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the user was soft deleted',
    required: false,
  })
  @Expose()
  deletedAt?: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
