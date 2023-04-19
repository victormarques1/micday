/*
  Warnings:

  - Added the required column `atuacao` to the `fisioterapeutas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crefito` to the `fisioterapeutas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fisioterapeutas" ADD COLUMN     "atuacao" TEXT NOT NULL,
ADD COLUMN     "crefito" TEXT NOT NULL;
