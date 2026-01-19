import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  async findByName(name: string): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { name: ILike(`%${name}%`) },
      relations: {},
    });
    if (categories.length === 0) {
      throw new HttpException('No categories found with the given name', 404);
    }
    return categories;
  }

  async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<Category> {
    const existingCategory = await this.findById(category.id);
    if (!existingCategory) {
      throw new HttpException('Category not found', 404);
    }
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findById(id);
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    await this.categoryRepository.delete(id);
  }
}
