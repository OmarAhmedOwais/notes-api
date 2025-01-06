import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderDto {
  @ApiProperty({ example: 'My Folder', description: 'The name of the folder' })
  @IsString({ message: 'Folder name must be a string' })
  @Length(3, 50, { message: 'Folder name must be between 3 and 50 characters' })
  readonly name: string;
}