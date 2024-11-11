import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { RecetteService } from '../recettes/recettes.service';
import { CreateRecetteDto } from './recette.dto';
import { Recipe } from '@prisma/client';

@Controller('recette')
export class RecetteController {
  constructor(private readonly RecetteService: RecetteService) {}

  @Get()
  async getAllRecettes(): Promise<Recipe[]> {
    return await this.RecetteService.getAllRecettes();
  }

  @Get(':RecipeId')
  async getOneIngredient(@Param('RecipeId') id: string): Promise<Recipe> {
    const recette = await this.RecetteService.getRecetteById(+id);
    if (!recette) {
      throw new NotFoundException(`Recette with ID ${id} not found`);
    }
    return recette;
  }

  @Post()
  async create(@Body() createRecetteDto: CreateRecetteDto) {
    return this.RecetteService.createRecette(createRecetteDto);
  }
  
  @Patch(':RecetteId')
  async update(@Param('RecetteId') id: string, @Body() createRecetteDto: CreateRecetteDto): Promise<Recipe> {
    const recette = await this.RecetteService.getRecetteById(+id);
    if (!recette) {
      throw new NotFoundException(`Recette with ID ${id} not found`);
    }
    return this.RecetteService.updateRecette(+id, createRecetteDto);
  }

  @Delete(':RecetteId')
  async delete(@Param('RecetteId') id: string): Promise<Recipe>{
    const recette = await this.RecetteService.getRecetteById(+id);
    if (!recette) {
      throw new NotFoundException(`Recette with ID ${id} not found`);
    }
    return this.RecetteService.deleteRecette(+id);
  }
}
