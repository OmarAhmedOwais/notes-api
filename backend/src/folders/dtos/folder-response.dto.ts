import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { NoteResponseDto } from '../../notes/dtos/note-response.dto';

export class FolderResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the folder',
  })
  @Expose()
  id: number;

  @ApiProperty({ example: 'My Folder', description: 'The name of the folder' })
  @Expose()
  name: string;

  @ApiProperty({
    type: () => NoteResponseDto,
    isArray: true,
    description: 'The notes in the folder',
  })
  @Expose()
  @Type(() => NoteResponseDto)
  notes?: NoteResponseDto[];

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the folder was created',
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the folder was last updated',
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the folder was soft deleted',
    required: false,
  })
  @Expose()
  deletedAt?: Date;

  constructor(partial: Partial<FolderResponseDto>) {
    Object.assign(this, partial);
  }
}
