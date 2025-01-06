import { IsString, Length } from 'class-validator';

export class CreateFolderDto {
  @IsString({ message: 'Folder name must be a string' })
  @Length(3, 50, { message: 'Folder name must be between 3 and 50 characters' })
  readonly name: string;
}
