import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [],
})
export class CategoryModule {}
