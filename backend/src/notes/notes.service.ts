import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NoteResponseDto } from './dtos/note-response.dto';
import { plainToInstance } from 'class-transformer';
import { Folder } from '../folders/folder.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async findAll(
    folderId?: number,
    keyword?: string,
    noteType?: 'TEXT' | 'LIST',
    skip = 0,
    take = 10,
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ data: NoteResponseDto[]; total: number }> {
    const query = this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.folder', 'folder');

    if (folderId) {
      query.andWhere('folder.id = :folderId', { folderId });
    }

    if (keyword) {
      query.andWhere(
        '(note.title ILIKE :keyword OR note.content ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
    if (noteType) {
      query.andWhere('note.type = :noteType', { noteType });
    }
    query.orderBy('note.id', order).skip(skip).take(take);

    const [notes, total] = await query.getManyAndCount();
    const data = notes.map((note) => plainToInstance(NoteResponseDto, note));
    return { data, total };
  }

  async findOne(id: number): Promise<NoteResponseDto> {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['folder'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return plainToInstance(NoteResponseDto, note);
  }

  async create(createNoteDto: CreateNoteDto): Promise<NoteResponseDto> {
    const folder = await this.foldersRepository.findOne({
      where: { id: createNoteDto.folderId },
    });

    if (!folder) {
      throw new NotFoundException(
        `Folder with id ${createNoteDto.folderId} not found`,
      );
    }

    const newNote = this.notesRepository.create({
      ...createNoteDto,
      folder,
    });
    const savedNote = await this.notesRepository.save(newNote);
    return plainToInstance(NoteResponseDto, savedNote);
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['folder'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (updateNoteDto.folderId) {
      const folder = await this.foldersRepository.findOne({
        where: { id: updateNoteDto.folderId },
      });
      if (!folder) {
        throw new NotFoundException(
          `Folder with id ${updateNoteDto.folderId} not found`,
        );
      }
      note.folder = folder;
    }

    Object.assign(note, updateNoteDto);
    const updatedNote = await this.notesRepository.save(note);
    return plainToInstance(NoteResponseDto, updatedNote);
  }

  async delete(id: number): Promise<void> {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['folder'],
    });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.delete(id);
  }
}
