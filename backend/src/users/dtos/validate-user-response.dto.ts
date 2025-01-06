import { Expose } from 'class-transformer';
import { UserRole } from '../user-role.enum';

export class ValidateUserResponseDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  role: UserRole;
  @Expose()
  password: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  deletedAt?: Date;

  constructor(partial: Partial<ValidateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
