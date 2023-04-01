-- CreateTable
CREATE TABLE "fisioterapeutas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "fisioterapeutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL,
    "data_nasc" DATE NOT NULL,
    "altura" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "etnia" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "fisioterapeuta_id" TEXT NOT NULL,
    "tipo_id" TEXT NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_incontinencia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipos_incontinencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urinas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" TEXT NOT NULL,
    "perda_urina" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "paciente_id" TEXT NOT NULL,

    CONSTRAINT "urinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bebidas" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidade" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "paciente_id" TEXT NOT NULL,

    CONSTRAINT "bebidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orientacoes" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "fisioterapeuta_id" TEXT NOT NULL,
    "paciente_id" TEXT NOT NULL,

    CONSTRAINT "orientacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fisioterapeutas" ADD CONSTRAINT "fisioterapeutas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_fisioterapeuta_id_fkey" FOREIGN KEY ("fisioterapeuta_id") REFERENCES "fisioterapeutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "tipos_incontinencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "urinas" ADD CONSTRAINT "urinas_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bebidas" ADD CONSTRAINT "bebidas_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orientacoes" ADD CONSTRAINT "orientacoes_fisioterapeuta_id_fkey" FOREIGN KEY ("fisioterapeuta_id") REFERENCES "fisioterapeutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orientacoes" ADD CONSTRAINT "orientacoes_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
