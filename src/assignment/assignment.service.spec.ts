import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { Assignment, AssignmentStatus } from './entities/assignment.entity.js';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let repository: {
    create: ReturnType<typeof vi.fn>;
    find: ReturnType<typeof vi.fn>;
    findBy: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      create: vi.fn(),
      find: vi.fn(),
      findBy: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        { provide: getRepositoryToken(Assignment), useValue: repository },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an assignment', () => {
    const dto: CreateAssignmentDto = {
      title: 'Tugas 1',
      description: 'Kerjakan soal',
      dueDate: new Date('2026-12-01T10:00:00Z'),
      status: AssignmentStatus.PENDING,
      courseId: 1,
    };
    const assignment = { id: 1, ...dto, course: { id: dto.courseId } };
    repository.create.mockReturnValue(assignment);
    expect(service.create(dto)).toBe(assignment);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should find all assignments', async () => {
    repository.find.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('should find an assignment by id', async () => {
    repository.findBy.mockResolvedValue([{ id: 4 }]);
    await expect(service.findOne(4)).resolves.toEqual([{ id: 4 }]);
    expect(repository.findBy).toHaveBeenCalledWith({ id: 4 });
  });

  it('should update an assignment', () => {
    const dto: UpdateAssignmentDto = { status: AssignmentStatus.GRADED };
    repository.update.mockReturnValue({ affected: 1 });
    expect(service.update(4, dto)).toEqual({ affected: 1 });
    expect(repository.update).toHaveBeenCalledWith(4, dto);
  });

  it('should remove an assignment', () => {
    repository.delete.mockReturnValue({ affected: 1 });
    expect(service.remove(4)).toEqual({ affected: 1 });
    expect(repository.delete).toHaveBeenCalledWith(4);
  });
});
