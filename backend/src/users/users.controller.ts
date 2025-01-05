import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return plainToClass(UserResponseDto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return plainToClass(UserResponseDto, user);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => plainToClass(UserResponseDto, user));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return plainToClass(UserResponseDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
