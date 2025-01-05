import { Exclude } from 'class-transformer';
import { UserRole } from '../user-role.enum';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
