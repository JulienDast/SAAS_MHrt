import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRecetteDto } from './recette.dto';
import { Recipe } from '@prisma/client';

@Injectable()
export class RecetteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecette(createRecetteDto: CreateRecetteDto): Promise<Recipe> {
    return this.prismaService.recipe.create({
      data: createRecetteDto,
    });
  }

  async getAllRecettes():Promise<Recipe[]>{
    return await this.prismaService.recipe.findMany();
  }

  // async getRecetteById(id: number): Promise<any | null> {
  //   const recette = await this.prismaService.recipe.findUnique({
  //     where: { id },
  //     include: {
  //       products: {
  //         include: {
  //           product: true,
  //         },
  //       },
  //     },
  //   });
  
  //   if (!recette) {
  //     return null; 
  //   }  
  //   const products = recette.products.map(rp => rp.product);
  //   return {
  //     id: recette.id,
  //     name: recette.name,
  //     products, 
  //   };
  // }

  async getRecetteById(id: number): Promise<any | null> {
    const recette = await this.prismaService.recipe.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  
    if (!recette) {
      return null; 
    }  
  
    const products = recette.products.map(rp => ({
      ...rp.product, 
      quantity: rp.quantity, 
    }));
  
    return {
      id: recette.id,
      name: recette.name,
      gateauImgUrl: recette.gateauImgUrl, 
      products, 
    };
  }

  async updateRecette(id: number, createRecetteDto: CreateRecetteDto): Promise<Recipe> { 
    return this.prismaService.recipe.update({
      where: { id },
      data: createRecetteDto,
    });
  }

  async deleteRecette(id: number): Promise<Recipe> {
    return await this.prismaService.recipe.delete({
      where: { id },
    });
  }

}