import { Module } from '@nestjs/common';
import { RecetteController } from '../recettes/recettes.controller';
import { RecetteService } from '../recettes/recettes.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecetteController],
  providers: [RecetteService],
  exports: [RecetteService]
})
export class RecetteModule {}
