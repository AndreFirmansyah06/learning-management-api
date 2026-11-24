// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Course } from '../../courses/entities/course.entity.js';

// export enum AssignmentStatus {
//   PENDING = 'pending',
//   SUBMITTED = 'submitted',
//   GRADED = 'graded',
//   OVERDUE = 'overdue',
// }

// @Entity('assignments')
// export class Assignment {
//   @PrimaryGeneratedColumn({ type: 'int' })
//   id: number;

//   @Column({ type: 'varchar', length: 150 })
//   title: string;

//   @Column({ type: 'text' })
//   description: string;

//   @Column({ type: 'datetime', name: 'due_date' })
//   dueDate: Date;

//   @Column({
//     type: 'enum',
//     enum: AssignmentStatus,
//     default: AssignmentStatus.PENDING,
//   })
//   status: AssignmentStatus;

//   @ManyToOne(() => Course, (course) => course.assignment)
//   course_id: Course;

//   @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
//   updatedAt: Date;
// }


import * as typeorm from 'typeorm';
import { Course } from '../../courses/entities/course.entity.js';

export enum AssignmentStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  OVERDUE = 'overdue',
}

@typeorm.Entity('assignments')
export class Assignment {
  @typeorm.PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @typeorm.Column({ type: 'varchar', length: 150 })
  title: string;

  @typeorm.Column({ type: 'text' })
  description: string;

  @typeorm.Column({ type: 'datetime', name: 'due_date' })
  dueDate: Date;

  @typeorm.Column({
    type: 'enum',
    enum: AssignmentStatus,
    default: AssignmentStatus.PENDING,
  })
  status: AssignmentStatus;

  @typeorm.Column({ type: 'int', name: 'course_id' })
  course_id: number;

  @typeorm.ManyToOne(() => Course, (course) => course.assignments, {
    onDelete: 'CASCADE',
  })
  @typeorm.JoinColumn({ name: 'course_id' })
  course: typeorm.Relation<Course>;

  @typeorm.CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}