import { AssignmentStatus } from '../entities/assignment.entity.js';

export class CreateAssignmentDto {
  title: string;
  description: string;
  dueDate: Date;
  status?: AssignmentStatus;
  course_id: number;
}
