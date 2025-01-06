import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { FolderResponseDto } from './dtos/folder-response.dto';
import { plainToInstance } from 'class-transformer';
import { Public } from '../common/decorators/public.decorator';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('keyword') keyword?: string,
  ): Promise<FolderResponseDto[]> {
    const folders = await this.foldersService.findAll(keyword);
    return folders.map((folder) =>
      plainToInstance(FolderResponseDto, folder, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.findOne(id);
    return plainToInstance(FolderResponseDto, folder, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() folderData: CreateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.create(folderData);
    return plainToInstance(FolderResponseDto, folder, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.update(id, updateData);
    return plainToInstance(FolderResponseDto, folder, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.foldersService.delete(id);
  }
}
