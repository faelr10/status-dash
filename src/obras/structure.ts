import { Obras } from '@prisma/client';
import { NewObraDto } from './dto/newObra';

export type ObrasData = {
  id: string;
  nome: string;
  construtora: string;
  valor_final: string;
  dados_obra: object[];
};

export interface IObraService {
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<ObrasData[]>;
  getObraById(id: string): Promise<ObrasData | null>;
}

export interface IObraRepository {
  getObraByName(nome: string): Promise<Obras | null>;
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<Obras[]>;
  getObraById(id: string): Promise<any>;
}
