/*
  Warnings:

  - Added the required column `gateauImgUrl` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `gateauImgUrl` VARCHAR(191) NOT NULL;
