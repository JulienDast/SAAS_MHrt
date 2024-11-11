import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateRecetteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsOptional()
  @IsString()
  @IsUrl() 
  @MaxLength(2000)
  gateauImgUrl?: string;
}