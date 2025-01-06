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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { FolderResponseDto } from './dtos/folder-response.dto';
import { plainToInstance } from 'class-transformer';
import { Public } from '../common/decorators/public.decorator';
import { FindFoldersQueryDto } from './dtos/list-folder.dto';

@ApiTags('folders')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all folders' })
  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [FolderResponseDto],
  })
  async findAll(
    @Query() query: FindFoldersQueryDto,
  ): Promise<FolderResponseDto[]> {
    const { keyword } = query;
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
  @ApiOperation({ summary: 'Get folder by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.findOne(id);
    return plainToInstance(FolderResponseDto, folder, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create folder' })
  @ApiResponse({
    status: 201,
    description: 'The folder has been successfully created.',
    type: FolderResponseDto,
  })
  async create(
    @Body() folderData: CreateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.create(folderData);
    return plainToInstance(FolderResponseDto, folder, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update folder' })
  @ApiResponse({
    status: 202,
    description: 'The folder has been successfully updated.',
    type: FolderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
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
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete folder' })
  @ApiResponse({
    status: 204,
    description: 'The folder has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.foldersService.delete(id);
  }
}
