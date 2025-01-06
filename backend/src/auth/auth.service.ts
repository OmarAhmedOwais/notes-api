import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserResponseDto } from 'src/users/dtos/user-response.dto';
import { comparePasswords } from 'src/common/utils/password.util';
import { LoginUserDto } from './dtos/LoginUserDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    loginUserDto: LoginUserDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findByUsername(loginUserDto.username);
    if (!user) {
      return null;
    }
    const isPasswordValid = await comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    return plainToInstance(UserResponseDto, user);
  }

  async login(user: UserResponseDto) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    // 1) Check if user already exists
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // 2) Create the user in the database (this hashes the password in usersService)
    const user = await this.usersService.create(createUserDto);

    // 3) Optionally, auto-login by generating JWT right away
    const payload = { username: user.username, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    // 4) Return the user and the JWT token
    return {
      user: plainToInstance(UserResponseDto, user),
      access_token: accessToken,
    };
  }
}
