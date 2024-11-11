import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { Recette_IngredientController } from './recette_ingredient.controller';
import { Recette_IngredientService } from './recette_ingredient.service';
import { IngredientModule } from 'src/ingredients/ingredients.module';
import { RecetteModule } from 'src/recettes/recettes.module';

@Module({
  imports: [PrismaModule, IngredientModule, RecetteModule],
  controllers: [Recette_IngredientController],
  providers: [Recette_IngredientService],
})
export class Recette_IngredientModule {}
