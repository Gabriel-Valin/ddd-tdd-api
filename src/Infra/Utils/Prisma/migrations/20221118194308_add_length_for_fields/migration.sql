/*
  Warnings:

  - You are about to alter the column `name` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `nick` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(16)`.
  - You are about to alter the column `phone` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE `Contact` MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `nick` VARCHAR(16) NOT NULL,
    MODIFY `phone` VARCHAR(13) NOT NULL;
