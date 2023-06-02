/*
  Warnings:

  - You are about to drop the column `tipo_id` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the `tipos_incontinencia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo_incontinencia` to the `pacientes` table without a default value. This is not possible if the table is not empty.
  - Made the column `etnia` on table `pacientes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_tipo_id_fkey";

-- AlterTable
ALTER TABLE "pacientes" DROP COLUMN "tipo_id",
ADD COLUMN     "tipo_incontinencia" TEXT NOT NULL,
ALTER COLUMN "etnia" SET NOT NULL;

-- DropTable
DROP TABLE "tipos_incontinencia";
