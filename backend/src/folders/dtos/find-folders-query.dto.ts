import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindFoldersQueryDto {
  @ApiPropertyOptional({ description: 'Keyword to search folders' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
