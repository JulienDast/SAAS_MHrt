import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateIngredientDto } from './ingredients.dto';

@Injectable()
export class IngredientService {
  constructor(private readonly prismaService: PrismaService) {}

  async createIngredient(createIngredientDto: CreateIngredientDto): Promise<Product> {
    return this.prismaService.product.create({
      data: createIngredientDto,
    });
  }

  async getAllIngredients():Promise<Product[]>{
    return await this.prismaService.product.findMany();
  }

  async getIngredientById(id:number):Promise<Product | null>{
    return await this.prismaService.product.findUnique({
      where: { id },
    })
  }

  async updateIngredient(id: number, createIngredientDto: CreateIngredientDto): Promise<Product> { 
    return this.prismaService.product.update({
      where: { id },
      data: createIngredientDto,
    });
  }

  async deleteIngredient(id: number): Promise<Product> {
    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}