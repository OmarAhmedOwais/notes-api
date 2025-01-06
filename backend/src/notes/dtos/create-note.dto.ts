import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteType } from '../note-type.enum';

export class CreateNoteDto {
  @ApiProperty({ example: 'My Note', description: 'The title of the note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is the content of the note.',
    description: 'The content of the note',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: NoteType.TEXT,
    enum: NoteType,
    description: 'The type of the note',
  })
  @IsEnum(NoteType)
  @IsNotEmpty()
  type: NoteType;

  @ApiProperty({
    example: 1,
    description: 'The ID of the folder this note belongs to',
  })
  @IsNumber()
  @IsNotEmpty()
  folderId: number;
}
