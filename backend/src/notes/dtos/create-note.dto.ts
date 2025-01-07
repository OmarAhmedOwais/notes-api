import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateIf,
  IsDefined,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NoteType } from '../note-type.enum';

export class CreateNoteDto {
  @ApiProperty({ example: 'My Note', description: 'The title of the note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: NoteType.TEXT,
    enum: NoteType,
    description: 'The type of the note',
  })
  @IsEnum(NoteType)
  @IsNotEmpty()
  type: NoteType;

  @ApiPropertyOptional({
    example: 'This is the content of the note.',
    description: 'The content of the note (required if type is TEXT)',
  })
  @ValidateIf((o) => o.type === NoteType.TEXT)
  @IsString()
  @IsDefined({ message: 'textContent must be defined when the type is TEXT' })
  textContent?: string;

  @ApiPropertyOptional({
    example: ['Item 1', 'Item 2'],
    description: 'The list content of the note (required if type is LIST)',
  })
  @ValidateIf((o) => o.type === NoteType.LIST)
  @IsArray()
  @IsDefined({ message: 'listContent must be defined when the type is LIST' })
  listContent?: string[];

  @ApiProperty({
    example: 1,
    description: 'The ID of the folder this note belongs to',
  })
  @IsNumber()
  @IsNotEmpty()
  folderId: number;

  get content(): string | string[] {
    return this.type === NoteType.TEXT ? this.textContent : this.listContent;
  }
}
