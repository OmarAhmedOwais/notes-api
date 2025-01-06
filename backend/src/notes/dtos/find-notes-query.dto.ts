import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { NoteType } from '../note-type.enum';

export class FindNotesQueryDto {
  @ApiPropertyOptional({ description: 'Filter by folder ID' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  folderId?: number;

  @ApiPropertyOptional({ description: 'Keyword to search notes' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: 'Filter by note type (TEXT or LIST)',
    enum: NoteType,
  })
  @IsOptional()
  @IsEnum(NoteType)
  noteType?: NoteType;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  pageNumber?: number;

  @ApiPropertyOptional({
    description: 'Page size for pagination',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  pageSize?: number;

  @ApiPropertyOptional({ description: 'Order of records (ASC or DESC)' })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';
}
