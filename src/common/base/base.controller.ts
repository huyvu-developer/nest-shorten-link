import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BaseService, BaseEntity } from './base.service';
import { DeepPartial } from 'typeorm';

export class BaseController<
  T extends BaseEntity,
  CreateDto extends DeepPartial<T> = DeepPartial<T>,
  UpdateDto extends DeepPartial<T> = DeepPartial<T>,
> {
  constructor(protected readonly service: BaseService<T>) {}

  @Post()
  async create(@Body() data: CreateDto): Promise<T> {
    return this.service.create(data as DeepPartial<T>);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDto): Promise<T> {
    return this.service.update(id, data as DeepPartial<T>);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
