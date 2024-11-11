import { Module } from '@nestjs/common';
import { IngredientController } from '../ingredients/ingredients.controller';
import { IngredientService } from '../ingredients/ingredients.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
