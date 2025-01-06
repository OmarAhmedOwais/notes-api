import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Folder } from '../folders/folder.entity';
import { NoteType } from './note-type.enum';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'enum', enum: NoteType, default: NoteType.TEXT })
  type: NoteType;

  @ManyToOne(() => Folder, (folder) => folder.notes, { onDelete: 'CASCADE' })
  folder: Folder;

  // --- Timestamps ---
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // --- Soft Delete ---
  @DeleteDateColumn()
  deletedAt?: Date;
}
