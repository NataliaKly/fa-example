import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDao } from './domain/category.dao';
import { CostDao } from './domain/cost.dao';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDao, CostDao])],
  exports: [TypeOrmModule]
})
export class DbModule {}
