import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CategoryService } from '../../category/services/category.service';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: { category: true } });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async findByName(name: string): Promise<Product[]> {
    const product = this.productRepository.find({
      where: { name: ILike(`%${name}%`) },
      relations: { category: true },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(product: Product): Promise<Product> {
    const category = await this.categoryService.findById(product.category.id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    product.category = category;
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    const existingProduct = await this.findById(product.id);
    if (!existingProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const category = await this.categoryService.findById(product.category.id);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    product.category = category;
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.delete(id);
  }
}
