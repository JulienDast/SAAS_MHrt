import { Module } from '@nestjs/common';
import { IngredientModule } from './ingredients/ingredients.module';
import { RecetteModule } from './recettes/recettes.module';
import { Recette_IngredientModule } from './recette_ingredient/recette_ingredient.module';

@Module({
  imports: [IngredientModule, RecetteModule, Recette_IngredientModule]
})
export class AppModule {}
