import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { FolderResponseDto } from './dtos/folder-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginationOptionsDto, PaginationResponseDto } from 'src/common/dtos';
import { paginate } from 'src/common/helpers';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async findAll(
    paginationOptionsDto?: PaginationOptionsDto,
  ): Promise<PaginationResponseDto<FolderResponseDto>> {
    const query = this.foldersRepository
      .createQueryBuilder('folder')
      .leftJoinAndSelect('folder.notes', 'notes');

    if (paginationOptionsDto?.keyword) {
      query.andWhere('folder.name ILIKE :keyword', {
        keyword: `%${paginationOptionsDto.keyword}%`,
      });
    }

    const paginatedResult = await paginate(query, {
      ...paginationOptionsDto,
      alias: 'folder',
      orderByField: 'id',
    });
    const result = paginatedResult.data.map((folder: Folder) =>
      plainToInstance(FolderResponseDto, folder),
    );
    return new PaginationResponseDto(result, paginatedResult.meta);
  }

  async findOne(id: number): Promise<FolderResponseDto> {
    const folder = await this.foldersRepository.findOne({
      where: { id },
      relations: ['notes'],
    });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }
    return plainToInstance(FolderResponseDto, folder);
  }

  async create(createFolderDto: CreateFolderDto): Promise<FolderResponseDto> {
    const existingFolder = await this.foldersRepository.findOne({
      where: { name: createFolderDto.name },
    });
    if (existingFolder) {
      throw new ConflictException('Folder already exists');
    }

    const newFolder = this.foldersRepository.create({
      name: createFolderDto.name,
    });
    const savedFolder = await this.foldersRepository.save(newFolder);
    return plainToInstance(FolderResponseDto, savedFolder);
  }

  async update(
    id: number,
    updateFolderDto: UpdateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersRepository.findOne({
      where: { id },
    });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    Object.assign(folder, updateFolderDto);
    const updatedFolder = await this.foldersRepository.save(folder);
    return plainToInstance(FolderResponseDto, updatedFolder);
  }

  async delete(id: number): Promise<void> {
    const folder = await this.foldersRepository.findOne({
      where: { id },
    });
    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    await this.foldersRepository.delete(id);
  }
}
