import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { hashPassword } from 'src/common/helpers/password.helper';
import { ValidateUserResponseDto } from './dtos/validate-user-response.dto';
import { PaginationOptionsDto, PaginationResponseDto } from 'src/common/dtos';
import { paginate } from 'src/common/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(createUserDto.password);
    // check if user already exists username or email
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (existingUser) {
      throw new NotFoundException('User already exists');
    }
    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
    });
    const savedUser = await this.usersRepository.save(newUser);
    return plainToInstance(UserResponseDto, savedUser);
  }

  async findByUsername(
    username: string,
  ): Promise<ValidateUserResponseDto | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ? plainToInstance(ValidateUserResponseDto, user) : undefined;
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserResponseDto, user);
  }

  async findAll(
    paginationOptionsDto?: PaginationOptionsDto,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    const query = this.usersRepository.createQueryBuilder('user');
    if (paginationOptionsDto?.keyword) {
      query.andWhere(
        'user.email ILIKE :keyword OR user.username ILIKE :keyword',
        {
          keyword: `%${paginationOptionsDto.keyword}%`,
        },
      );
    }

    const paginatedResult = await paginate(query, {
      ...paginationOptionsDto,
      alias: 'user',
      orderByField: 'id',
    });
    const result = paginatedResult.data.map((user) =>
      plainToInstance(UserResponseDto, user),
    );
    return new PaginationResponseDto(result, paginatedResult.meta);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...updateFields } = updateUserDto;
    Object.assign(user, updateFields);

    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await this.usersRepository.save(user);
    return plainToInstance(UserResponseDto, updatedUser);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
