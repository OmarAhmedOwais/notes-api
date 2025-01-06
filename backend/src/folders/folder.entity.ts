import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Note, (note) => note.folder, { cascade: true })
  notes: Note[];
}
