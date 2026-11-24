import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsController } from './materials.controller.js';
import { MaterialsService } from './materials.service.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { UpdateMaterialDto } from './dto/update-material.dto.js';

describe('MaterialsController', () => {
  let controller: MaterialsController;
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
      controllers: [MaterialsController],
      providers: [{ provide: MaterialsService, useValue: service }],
    }).compile();

    controller = module.get<MaterialsController>(MaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate create', () => {
    const dto: CreateMaterialDto = { title: 'Bab 1', content: 'Isi', courseId: 1 };
    service.create.mockReturnValue(dto);
    expect(controller.create(dto)).toBe(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should delegate findAll', () => {
    service.findAll.mockReturnValue([]);
    expect(controller.findAll()).toEqual([]);
  });

  it('should delegate findOne', () => {
    service.findOne.mockReturnValue({ id: 3 });
    expect(controller.findOne('3')).toEqual({ id: 3 });
    expect(service.findOne).toHaveBeenCalledWith(3);
  });

  it('should delegate update', () => {
    const dto: UpdateMaterialDto = { content: 'Isi baru' };
    service.update.mockReturnValue(dto);
    expect(controller.update('3', dto)).toBe(dto);
    expect(service.update).toHaveBeenCalledWith(3, dto);
  });

  it('should delegate remove', () => {
    service.remove.mockReturnValue({ deleted: true });
    expect(controller.remove('3')).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(3);
  });
});
