import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { NoteType } from '../note-type.enum';
import {
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
  IsEnum,
} from 'class-validator';

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
  @ValidateIf((o) => o.type === NoteType.TEXT)
  @IsOptional()
  @IsString()
  textContent?: string;

  @ApiPropertyOptional({
    example: ['Updated Item 1', 'Updated Item 2'],
    description: 'The updated list content of the note (if type is LIST)',
  })
  @ValidateIf((o) => o.type === NoteType.LIST)
  @IsOptional()
  @IsArray()
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
