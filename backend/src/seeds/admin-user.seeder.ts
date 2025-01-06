import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class AdminUserSeeder {
  constructor(private readonly usersService: UsersService) {}

  async seed() {
    const adminUser: CreateUserDto = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: UserRole.ADMIN,
    };

    // Check if the admin user already exists
    const existingUser = await this.usersService.findByEmail(adminUser.email);
    if (!existingUser) {
      await this.usersService.create(adminUser);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  }
}
