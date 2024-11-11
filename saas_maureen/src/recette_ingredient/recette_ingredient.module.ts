import { Module } from '@nestjs/common';
import { Recette_IngredientController } from './recette_ingredient.controller';
import { Recette_IngredientService } from './recette_ingredient.service';
import { PrismaModule } from '../db/prisma/prisma.module';
import { IngredientModule } from '../ingredients/ingredients.module';
import { RecetteModule } from '../recettes/recettes.module';

@Module({
  imports: [PrismaModule, IngredientModule, RecetteModule],
  controllers: [Recette_IngredientController],
  providers: [Recette_IngredientService],
})
export class Recette_IngredientModule {}
