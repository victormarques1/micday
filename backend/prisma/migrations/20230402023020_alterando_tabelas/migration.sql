/*
  Warnings:

  - You are about to drop the column `data_nasc` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `idade` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bebidas" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "fisioterapeutas" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "orientacoes" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "data_nasc",
ADD COLUMN     "idade" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tipos_incontinencia" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "urinas" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "updated_at" DROP DEFAULT;

