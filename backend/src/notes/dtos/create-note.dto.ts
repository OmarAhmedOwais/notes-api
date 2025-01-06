import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NoteType } from '../note-type.enum';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(NoteType)
  @IsNotEmpty()
  type: NoteType;

  @IsNumber()
  @IsNotEmpty()
  folderId: number;
}
