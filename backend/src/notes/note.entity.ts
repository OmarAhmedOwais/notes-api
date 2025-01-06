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

  @Column({ type: 'enum', enum: NoteType, default: NoteType.TEXT })
  type: NoteType;

  @Column({ type: 'text', nullable: true })
  private textContent: string;

  @Column({ type: 'simple-array', nullable: true })
  private listContent: string[];

  @ManyToOne(() => Folder, (folder) => folder.notes, { onDelete: 'CASCADE' })
  folder: Folder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  get content(): string | string[] {
    return this.type === NoteType.TEXT ? this.textContent : this.listContent;
  }

  set content(value: string | string[]) {
    if (this.type === NoteType.TEXT) {
      this.textContent = value as string;
      this.listContent = null;
    } else {
      this.listContent = value as string[];
      this.textContent = null;
    }
  }
}
