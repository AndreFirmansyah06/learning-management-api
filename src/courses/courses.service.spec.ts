import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './entities/course.entity.js';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: {
    create: ReturnType<typeof vi.fn>;
    find: ReturnType<typeof vi.fn>;
    findOneBy: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      create: vi.fn(),
      find: vi.fn(),
      findOneBy: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useValue: repository },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', () => {
    const dto: CreateCourseDto = { name: 'Matematika', description: 'Aljabar' };
    const course = { id: 1, ...dto };
    repository.create.mockReturnValue(course);
    expect(service.create(dto)).toBe(course);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should find all courses', async () => {
    repository.find.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('should find a course by id', async () => {
    repository.findOneBy.mockResolvedValue({ id: 1 });
    await expect(service.findOne(1)).resolves.toEqual({ id: 1 });
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a course', () => {
    const dto: UpdateCourseDto = { name: 'Matematika Lanjutan' };
    repository.update.mockReturnValue({ affected: 1 });
    expect(service.update(1, dto)).toEqual({ affected: 1 });
    expect(repository.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a course', () => {
    repository.delete.mockReturnValue({ affected: 1 });
    expect(service.remove(1)).toEqual({ affected: 1 });
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
