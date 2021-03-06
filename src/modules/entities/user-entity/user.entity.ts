import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../todo-entity/task.entity';
import { Comment } from '../comment-entity/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];
}
