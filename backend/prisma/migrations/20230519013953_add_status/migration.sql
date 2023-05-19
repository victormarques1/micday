-- AlterTable
ALTER TABLE "orientacoes" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
