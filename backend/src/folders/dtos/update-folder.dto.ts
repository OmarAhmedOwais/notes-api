import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFolderDto } from './create-folder.dto';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
  @ApiProperty({
    example: 'My Updated Folder',
    description: 'The updated name of the folder',
    required: false,
  })
  name?: string;
}
