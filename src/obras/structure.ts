import { DadosObras, Obras } from '@prisma/client';
import { NewObraDto } from './dto/newObra';
import { NewDetailsObraDto } from './dto/newDetailsObra';

export type ObrasData = {
  id: string;
  name: string;
  construction_company: string;
  final_value: string;
  data_obra: any;
};

export interface IObraService {
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<Obras[]>;
  getObraById(id: string): Promise<ObrasData | null>;
  addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras>;
}

export interface IObraRepository {
  getObraByName(nome: string): Promise<Obras | null>;
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<Obras[]>;
  getObraById(id: string): Promise<any>;
  addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras>;
}
