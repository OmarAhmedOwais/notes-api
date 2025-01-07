import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { NoteType } from '../note-type.enum';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { IsContentValid } from '../pipe/isContent-valid.pipe';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiPropertyOptional({
    example: 'My Updated Note',
    description: 'The updated title of the note',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'This is the updated content of the note.',
    description: 'The updated content of the note (if type is TEXT)',
  })
  @IsOptional()
  @IsString()
  @IsContentValid({ message: 'textContent is required when type is TEXT' })
  textContent?: string;

  @ApiPropertyOptional({
    example: ['Updated Item 1', 'Updated Item 2'],
    description: 'The updated list content of the note (if type is LIST)',
  })
  @IsOptional()
  @IsArray()
  @IsContentValid({ message: 'listContent is required when type is LIST' })
  listContent?: string[];

  @ApiPropertyOptional({
    example: NoteType.TEXT,
    enum: NoteType,
    description: 'The updated type of the note',
  })
  @IsOptional()
  @IsEnum(NoteType)
  type?: NoteType;

  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the folder this note belongs to',
  })
  @IsOptional()
  folderId?: number;

  get content(): string | string[] {
    return this.type === NoteType.TEXT ? this.textContent : this.listContent;
  }
}
