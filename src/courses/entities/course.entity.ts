// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   OneToMany,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Material } from '../../materials/entities/material.entity.js';
// import { Assignment } from '../../assignment/entities/assignment.entity.js';

// @Entity('courses')
// export class Course {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 100 })
//   name: string;

//   @Column({ type: 'text' })
//   description: string;

//   // @OneToMany(() => Material, (material) => material.course)
//   // materials: Material[];

//   @OneToMany(() => Assignment, (assignment) => assignment.course_id)
//   assignment: Course[];

//   @OneToMany(() => Material, (material) => material.course_id)
//   material: Course[];

//   @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
//   updatedAt: Date;
// }


import * as typeorm from 'typeorm';
import { Material } from '../../materials/entities/material.entity.js';
import { Assignment } from '../../assignment/entities/assignment.entity.js';

@typeorm.Entity('courses')
export class Course {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column({ type: 'varchar', length: 100 })
  name: string;

  @typeorm.Column({ type: 'text' })
  description: string;

  @typeorm.OneToMany(() => Assignment, (assignment) => assignment.course)
  assignments: typeorm.Relation<Assignment[]>;

  @typeorm.OneToMany(() => Material, (material) => material.course)
  materials: typeorm.Relation<Material[]>;

  @typeorm.CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}