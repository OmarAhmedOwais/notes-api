import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { NoteType } from '../note-type.enum';

export class NoteResponseDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the note' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'My Note', description: 'The title of the note' })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'This is the content of the note.',
    description: 'The content of the note',
  })
  @Expose()
  content: string;

  @ApiProperty({
    example: NoteType.TEXT,
    enum: NoteType,
    description: 'The type of the note',
  })
  @Expose()
  type: NoteType;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the note was created',
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the note was last updated',
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the note was soft deleted',
    required: false,
  })
  @Expose()
  deletedAt?: Date;

  constructor(partial: Partial<NoteResponseDto>) {
    Object.assign(this, partial);
  }
}
