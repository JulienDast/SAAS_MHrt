import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateRecette_IngredientDto {
  @IsNotEmpty()
  @IsNumber()
  recipeId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 5 }) 
  @Min(0) 
  @IsNumber()
  quantity: number;
}