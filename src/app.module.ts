import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module.js';
import { Course } from './courses/entities/course.entity.js';
import { MaterialsModule } from './materials/materials.module.js';
import { Material } from './materials/entities/material.entity.js';
import { AssignmentModule } from './assignment/assignment.module.js';
import { Assignment } from './assignment/entities/assignment.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'db_learning_management',
      entities: [Material, Assignment, Course],
      synchronize: true,
    }),
    CoursesModule,
    MaterialsModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
