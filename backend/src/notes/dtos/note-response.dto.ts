import { Expose } from 'class-transformer';
import { NoteType } from '../note-type.enum';

export class NoteResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  type: NoteType;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  deletedAt?: Date;

  constructor(partial: Partial<NoteResponseDto>) {
    Object.assign(this, partial);
  }
}
