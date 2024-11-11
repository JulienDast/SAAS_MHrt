import { IsNotEmpty, IsNumber, IsString, MaxLength, IsOptional, IsUrl, Min } from "class-validator";

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 5 }) 
  @Min(0) 
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  unity: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl() 
  @MaxLength(2000)
  imageUrl?: string;
}