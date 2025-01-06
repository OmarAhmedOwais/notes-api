import { Expose, Type } from 'class-transformer';
import { NoteResponseDto } from '../../notes/dtos/note-response.dto';

@Expose()
export class FolderResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => NoteResponseDto)
  notes?: NoteResponseDto[];

  constructor(partial: Partial<FolderResponseDto>) {
    Object.assign(this, partial);
  }
}
