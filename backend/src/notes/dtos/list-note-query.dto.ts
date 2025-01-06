import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { NoteType } from '../note-type.enum';
import { PaginationOptionsDto } from 'src/common/dtos';

export class ListNotesQueryDto extends PaginationOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by folder ID' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  folderId?: number;

  @ApiPropertyOptional({
    description: 'Filter by note type (TEXT or LIST)',
    enum: NoteType,
  })
  @IsOptional()
  @IsEnum(NoteType)
  noteType?: NoteType;
}
