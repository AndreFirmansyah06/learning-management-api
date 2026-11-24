import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsService } from './materials.service.js';
import { MaterialsController } from './materials.controller.js';
import { Material } from './entities/material.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
