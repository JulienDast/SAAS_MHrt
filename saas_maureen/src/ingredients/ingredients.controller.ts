import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { IngredientService } from '../ingredients/ingredients.service';
import { CreateIngredientDto } from './ingredients.dto';
import { Product } from '@prisma/client';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly IngredientService: IngredientService) {}
  
  @Get()
  async getAllIngredients(): Promise<Product[]> {
    return await this.IngredientService.getAllIngredients();
  }

  @Get(':IngredientId')
  async getOneIngredient(@Param('IngredientId') id: string): Promise<Product> {
    const ingredient = await this.IngredientService.getIngredientById(+id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  @Post()
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.IngredientService.createIngredient(createIngredientDto);
  }

  @Patch(':IngredientId')
  async update(@Param('IngredientId') id: string, @Body() createIngredientDto: CreateIngredientDto): Promise<Product> {
    const ingredient = await this.IngredientService.getIngredientById(+id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return this.IngredientService.updateIngredient(+id, createIngredientDto);
  }

  @Delete(':IngredientId')
  async delete(@Param('IngredientId') id: string): Promise<Product>{
    const existingIngredient = await this.IngredientService.getIngredientById(+id);
    if (!existingIngredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return this.IngredientService.deleteIngredient(+id);
  }
}
