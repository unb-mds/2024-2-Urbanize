-- CreateTable
CREATE TABLE "FonteDeRecurso" (
    "id" SERIAL NOT NULL,
    "origem" TEXT NOT NULL,
    "valorInvestimentoPrevisto" DECIMAL(65,30) NOT NULL,
    "projetoId" TEXT NOT NULL,

    CONSTRAINT "FonteDeRecurso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FonteDeRecurso" ADD CONSTRAINT "FonteDeRecurso_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
