import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { UpdateMaterialDto } from './dto/update-material.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.materialRepository.save(createMaterialDto);
  }

  findAll() {
    return this.materialRepository.find();
  }

  findOne(id: number) {
    return this.materialRepository.findOneBy({ id });
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  remove(id: number) {
    return this.materialRepository.delete(id);
  }
}
