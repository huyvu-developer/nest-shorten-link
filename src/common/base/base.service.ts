import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export interface BaseEntity {
  id: number | string;
}

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(protected repository: Repository<T>) {}
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: number | string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    return entity;
  }

  async update(id: number | string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    return await this.repository.save(entity);
  }

  async remove(id: number | string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
