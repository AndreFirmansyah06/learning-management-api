import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentController } from './assignment.controller.js';
import { AssignmentService } from './assignment.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { AssignmentStatus } from './entities/assignment.entity.js';

describe('AssignmentController', () => {
  let controller: AssignmentController;
  let service: {
    create: ReturnType<typeof vi.fn>;
    findAll: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    service = {
      create: vi.fn(),
      findAll: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentController],
      providers: [{ provide: AssignmentService, useValue: service }],
    }).compile();

    controller = module.get<AssignmentController>(AssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate create', () => {
    const dto: CreateAssignmentDto = {
      title: 'Tugas 1',
      description: 'Kerjakan soal',
      dueDate: new Date('2026-12-01T10:00:00Z'),
      status: AssignmentStatus.PENDING,
      courseId: 1,
    };
    service.create.mockReturnValue(dto);
    expect(controller.create(dto)).toBe(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should delegate findAll', () => {
    service.findAll.mockReturnValue([]);
    expect(controller.findAll()).toEqual([]);
  });

  it('should delegate findOne', () => {
    service.findOne.mockReturnValue({ id: 4 });
    expect(controller.findOne('4')).toEqual({ id: 4 });
    expect(service.findOne).toHaveBeenCalledWith(4);
  });

  it('should delegate update', () => {
    const dto: UpdateAssignmentDto = { status: AssignmentStatus.GRADED };
    service.update.mockReturnValue(dto);
    expect(controller.update('4', dto)).toBe(dto);
    expect(service.update).toHaveBeenCalledWith(4, dto);
  });

  it('should delegate remove', () => {
    service.remove.mockReturnValue({ deleted: true });
    expect(controller.remove('4')).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(4);
  });
});
