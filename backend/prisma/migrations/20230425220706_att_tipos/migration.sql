/*
  Warnings:

  - Changed the type of `quantidade` on the `bebidas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `altura` on the `pacientes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `peso` on the `pacientes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `necessidade_urina` to the `urinas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantidade` on the `urinas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "bebidas" DROP COLUMN "quantidade",
ADD COLUMN     "quantidade" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "orientacoes" ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "altura",
ADD COLUMN     "altura" DOUBLE PRECISION NOT NULL,
DROP COLUMN "peso",
ADD COLUMN     "peso" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "urinas" ADD COLUMN     "necessidade_urina" BOOLEAN NOT NULL,
DROP COLUMN "quantidade",
ADD COLUMN     "quantidade" DOUBLE PRECISION NOT NULL;
