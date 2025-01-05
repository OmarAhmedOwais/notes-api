import { UserRole } from '../user-role.enum';

export class ValidateUserResponseDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  password: string;

  constructor(partial: Partial<ValidateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
