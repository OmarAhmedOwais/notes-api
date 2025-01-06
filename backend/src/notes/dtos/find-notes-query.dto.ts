import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
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
    description: 'Number of records to skip for pagination',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  skip?: number;

  @ApiPropertyOptional({
    description: 'Number of records to take for pagination',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  take?: number;

  @ApiPropertyOptional({ description: 'Order of records (ASC or DESC)' })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';
}
