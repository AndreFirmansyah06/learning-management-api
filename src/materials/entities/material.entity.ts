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

// @Entity('materials')
// export class Material {
//   @PrimaryGeneratedColumn({ type: 'int' })
//   id: number;

//   @Column({ type: 'varchar', length: 150 })
//   title: string;

//   @Column({ type: 'text' })
//   content: string;

//   @ManyToOne(() => Course, (course) => course.assignment)
//   course_id: Course;

//   @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
//   updatedAt: Date;
// }


import * as typeorm from 'typeorm';
import { Course } from '../../courses/entities/course.entity.js';

@typeorm.Entity('materials')
export class Material {
  @typeorm.PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @typeorm.Column({ type: 'varchar', length: 150 })
  title: string;

  @typeorm.Column({ type: 'text' })
  content: string;

  @typeorm.Column({ type: 'int', name: 'course_id' })
  course_id: number;

  @typeorm.ManyToOne(() => Course, (course) => course.materials, {
    onDelete: 'CASCADE',
  })
  @typeorm.JoinColumn({ name: 'course_id' })
  course: typeorm.Relation<Course>;

  @typeorm.CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}