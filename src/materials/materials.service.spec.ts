import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsService } from './materials.service.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { UpdateMaterialDto } from './dto/update-material.dto.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Material } from './entities/material.entity.js';

describe('MaterialsService', () => {
  let service: MaterialsService;
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
        MaterialsService,
        { provide: getRepositoryToken(Material), useValue: repository },
      ],
    }).compile();

    service = module.get<MaterialsService>(MaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a material', () => {
    const dto: CreateMaterialDto = { title: 'Bab 1', content: 'Pengantar', courseId: 1 };
    const material = { id: 1, ...dto };
    repository.create.mockReturnValue(material);
    expect(service.create(dto)).toBe(material);
    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should find all materials', async () => {
    repository.find.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('should find a material by id', async () => {
    repository.findOneBy.mockResolvedValue({ id: 3 });
    await expect(service.findOne(3)).resolves.toEqual({ id: 3 });
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 3 });
  });

  it('should update a material', () => {
    const dto: UpdateMaterialDto = { title: 'Bab 2' };
    repository.update.mockReturnValue({ affected: 1 });
    expect(service.update(3, dto)).toEqual({ affected: 1 });
    expect(repository.update).toHaveBeenCalledWith(3, dto);
  });

  it('should remove a material', () => {
    repository.delete.mockReturnValue({ affected: 1 });
    expect(service.remove(3)).toEqual({ affected: 1 });
    expect(repository.delete).toHaveBeenCalledWith(3);
  });
});
