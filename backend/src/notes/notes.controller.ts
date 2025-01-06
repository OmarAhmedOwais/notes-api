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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NoteResponseDto } from './dtos/note-response.dto';
import { plainToInstance } from 'class-transformer';
import { parsePagination } from '../common/utils/pagination.util';
import { Public } from '../common/decorators/public.decorator';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: any,
  ): Promise<{ data: NoteResponseDto[]; total: number }> {
    const { folderId, keyword } = query;
    const { skip, take, order } = parsePagination(query);

    const folderIdNum = folderId ? parseInt(folderId, 10) : undefined;

    return this.notesService.findAll(folderIdNum, keyword, skip, take, order);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NoteResponseDto> {
    const note = await this.notesService.findOne(id);
    return plainToInstance(NoteResponseDto, note, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteResponseDto> {
    const note = await this.notesService.create(createNoteDto);
    return plainToInstance(NoteResponseDto, note, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notesService.delete(id);
  }
}
