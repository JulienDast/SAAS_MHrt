import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecette_IngredientDto } from './recette_ingredient.dto';
import { PrismaService } from '../db/prisma/prisma.service';

@Injectable()
export class Recette_IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async createRecette_Ingredient(createRecetteIngredientDto: CreateRecette_IngredientDto) {
    const { recipeId, productId, quantity } = createRecetteIngredientDto;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${productId} non trouvé`);
    }
    return this.prisma.recipeProduct.create({
      data: {
        recipeId,
        productId,
        quantity,
      },
    });
  }

  async deleteRecette_Ingredient(recipeId: number, productId: number) {
    const recetteIngredient = await this.prisma.recipeProduct.findUnique({
      where: {
        recipeId_productId: {
          recipeId: +recipeId,
          productId,
        },
      },
    });

    if (!recetteIngredient) {
      throw new NotFoundException(`Relation entre recette ${recipeId} et produit ${productId} non trouvée`);
    }
    return this.prisma.recipeProduct.delete({
      where: {
        id: recetteIngredient.id, 
      },
    });
  }
}