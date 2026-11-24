import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller.js';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

describe('CoursesController', () => {
  let controller: CoursesController;
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
      controllers: [CoursesController],
      providers: [{ provide: CoursesService, useValue: service }],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate create', () => {
    const dto: CreateCourseDto = { name: 'Fisika', description: 'Mekanika' };
    service.create.mockReturnValue(dto);
    expect(controller.create(dto)).toBe(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should delegate findAll', () => {
    service.findAll.mockReturnValue([]);
    expect(controller.findAll()).toEqual([]);
  });

  it('should delegate findOne', () => {
    service.findOne.mockReturnValue({ id: 2 });
    expect(controller.findOne('2')).toEqual({ id: 2 });
    expect(service.findOne).toHaveBeenCalledWith(2);
  });

  it('should delegate update', () => {
    const dto: UpdateCourseDto = { description: 'Deskripsi baru' };
    service.update.mockReturnValue(dto);
    expect(controller.update('2', dto)).toBe(dto);
    expect(service.update).toHaveBeenCalledWith(2, dto);
  });

  it('should delegate remove', () => {
    service.remove.mockReturnValue({ deleted: true });
    expect(controller.remove('2')).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(2);
  });
});
