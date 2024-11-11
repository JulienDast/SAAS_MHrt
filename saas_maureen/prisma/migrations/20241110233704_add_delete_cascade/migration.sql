-- DropForeignKey
ALTER TABLE `recipeproduct` DROP FOREIGN KEY `RecipeProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `recipeproduct` DROP FOREIGN KEY `RecipeProduct_recipeId_fkey`;

-- AddForeignKey
ALTER TABLE `RecipeProduct` ADD CONSTRAINT `RecipeProduct_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeProduct` ADD CONSTRAINT `RecipeProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
