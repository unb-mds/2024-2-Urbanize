// Tipos auxiliares
export interface Projeto {
  idUnico: string;
  nome: string;
  cep?: string | null;
  endereco?: string | null;
  descricao?: string | null;
  funcaoSocial?: string | null;
  metaGlobal?: string | null;
  dataInicialPrevista: Date;
  dataFinalPrevista: Date;
  dataInicialEfetiva?: Date | null;
  dataFinalEfetiva?: Date | null;
  dataCadastro: Date;
  especie?: string | null;
  natureza: string;
  situacao: string;
  uf: string;
  populacaoBeneficiada: string;
  tomadores: Tomador[];
  executores: Executor[];
  repassadores: Repassador[];
  eixos: Eixo[];
  tipos: Tipo[];
  geometrias: Geometria[];
  fontesDeRecurso: FonteDeRecurso[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tomador {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto; // Relacionamento opcional para evitar dependência circular
}

export interface Executor {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Repassador {
  id: number;
  nome: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Eixo {
  id: number;
  descricao: string;
  projetoId: string;
  projeto?: Projeto;
}

export interface Tipo {
  id: number;
  descricao: string;
  idEixo: number;
  projetoId: string;
  projeto?: Projeto;
}

export interface Geometria {
  id: number;
  geometriaWkt: string;
  dataCriacao: Date;
  origem: string;
  latitude?: number | null;
  longitude?: number | null;
  projetoId: string;
  projeto?: Projeto;
}

export interface FonteDeRecurso {
  id: number;
  origem: string;
  valorInvestimentoPrevisto: string; // Decimal em Prisma é convertido para string no cliente
  projetoId: string;
  projeto?: Projeto;
}
