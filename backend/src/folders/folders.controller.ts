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
import { Public } from '../common/decorators/public.decorator';
import { FindFoldersQueryDto } from './dtos/list-folder.dto';
import { ApiPaginatedResponse } from 'src/common/decorators';

@ApiTags('folders')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all folders' })
  @ApiPaginatedResponse(FolderResponseDto)
  findAll(
    @Query() query: FindFoldersQueryDto,
  ): Promise<{ data: FolderResponseDto[] }> {
    const { ...paginationOptionsDto } = query;
    return this.foldersService.findAll(paginationOptionsDto);
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FolderResponseDto> {
    return this.foldersService.findOne(id);
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
  create(@Body() folderData: CreateFolderDto): Promise<FolderResponseDto> {
    return this.foldersService.create(folderData);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateFolderDto,
  ): Promise<FolderResponseDto> {
    return this.foldersService.update(id, updateData);
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
