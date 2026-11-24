import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  create(createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentRepository.save(createAssignmentDto);
  }

  findAll() {
    return this.assignmentRepository.find();
  }

  findOne(id: number) {
    return this.assignmentRepository.findBy({ id });
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentRepository.update(id,updateAssignmentDto);
  }

  remove(id: number) {
    return this.assignmentRepository.delete(id);
  }
}
