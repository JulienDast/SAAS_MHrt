import { Body, Controller, Delete, NotFoundException, Param, Post } from "@nestjs/common";
import { Recette_IngredientService } from "./recette_ingredient.service";
import { CreateRecette_IngredientDto } from "./recette_ingredient.dto";
import { RecetteService } from "../recettes/recettes.service";

@Controller('recette_ingredient')
export class Recette_IngredientController {
  constructor(private readonly Recette_IngredientService: Recette_IngredientService,
              private readonly RecetteService : RecetteService,
   ) {}

   @Post(':recetteId')
   async create(@Param('recetteId') recetteId: number, @Body() createRecetteIngredientDto: CreateRecette_IngredientDto){
     const recette = await this.RecetteService.getRecetteById(+recetteId);
     if (!recette) {
       throw new NotFoundException(`Recette avec l'ID ${recetteId} non trouvée`);
     }
     createRecetteIngredientDto.recipeId = recette.id;
     return this.Recette_IngredientService.createRecette_Ingredient(createRecetteIngredientDto);
   }

   @Delete(':recetteId')
   async delete(@Param('recetteId') recetteId: number, @Body() body: { productId: number }) {
     const { productId } = body;
     return this.Recette_IngredientService.deleteRecette_Ingredient(recetteId, productId);
   }
}