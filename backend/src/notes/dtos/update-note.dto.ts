import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { NoteType } from '../note-type.enum';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({
    example: 'My Updated Note',
    description: 'The updated title of the note',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'This is the updated content of the note.',
    description: 'The updated content of the note',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: NoteType.TEXT,
    enum: NoteType,
    description: 'The updated type of the note',
    required: false,
  })
  type?: NoteType;

  @ApiProperty({
    example: 1,
    description: 'The ID of the folder this note belongs to',
    required: false,
  })
  folderId?: number;
}
