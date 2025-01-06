import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NoteResponseDto } from './dtos/note-response.dto';
import { plainToInstance } from 'class-transformer';
import { Public } from '../common/decorators/public.decorator';
import { ListNotesQueryDto } from './dtos/list-note-query.dto';
import { ApiPaginatedResponse } from 'src/common/decorators';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all notes' })
  @ApiPaginatedResponse(NoteResponseDto)
  async findAll(
    @Query() query: ListNotesQueryDto,
  ): Promise<{ data: NoteResponseDto[] }> {
    const { folderId, noteType, ...paginationOptionsDto } = query;

    return this.notesService.findAll(folderId, noteType, paginationOptionsDto);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get note by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: NoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.findOne(id);
    return plainToInstance(NoteResponseDto, note, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({
    status: 201,
    description: 'The note has been successfully created.',
    type: NoteResponseDto,
  })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteResponseDto> {
    const note = await this.notesService.create(createNoteDto);
    return plainToInstance(NoteResponseDto, note, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update note' })
  @ApiResponse({
    status: 202,
    description: 'The note has been successfully updated.',
    type: NoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Note not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.update(id, updateNoteDto);
    return plainToInstance(NoteResponseDto, note, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({
    status: 204,
    description: 'The note has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Note not found' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notesService.delete(id);
  }
}
