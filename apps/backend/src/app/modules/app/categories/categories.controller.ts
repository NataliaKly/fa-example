import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { CategoryDao } from "../../db/domain/category.dao";
import { CategoryDto } from "@fa-example/models/category.dto";

@Controller("/categories")
export class CategoriesController {
  constructor(
    @InjectRepository(CategoryDao)
    private categoryRepository: Repository<CategoryDao>
  ) {}

  @Get()
  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map((category: CategoryDao) => ({
      id: category.id,
      title: category.title
    }));
  }

  @Post()
  async addCategories(@Body() categories: CategoryDto[], @Res() res: Response): Promise<void> {
    await this.categoryRepository.save(categories);
    res.status(HttpStatus.OK).send();
  }

  @Patch(":id")
  async updateCategory(@Body() body: { category: CategoryDto }): Promise<CategoryDto> {
    const category = await this.categoryRepository.save({
      id: body.category.id,
      title: body.category.title
    });

    return {
      id: category.id,
      title: category.title
    };
  }

  @Delete(":id")
  async deleteCategory(@Param() params, @Res() res: Response): Promise<void> {
    await this.categoryRepository.delete(params.id);
    res.status(HttpStatus.OK).send();
  }
}
