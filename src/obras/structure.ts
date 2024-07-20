import { DadosObras, Obras, TaxesObra } from '@prisma/client';
import { NewObraDto } from './dto/newObra';
import { NewDetailsObraDto } from './dto/newDetailsObra';

export type ObrasData = {
  id: string;
  name: string;
  construction_company: string;
  final_value: string;
  taxes_obra: TaxesObra[];
  data_obra: any;
};

export type TaxesData = {
  name: string;
  date: string;
  obra_id: string;
  value: string;
};

export interface IObraService {
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<Obras[]>;
  getObraById(id: string): Promise<ObrasData | null>;
  addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras>;
}

export interface ITaxesObrasService {
  registerTaxe(data: TaxesData): Promise<any>;
}

export interface IObraRepository {
  //Obra
  getObraByName(nome: string): Promise<Obras | null>;
  newObra(obra: NewObraDto): Promise<Obras>;
  getObras(): Promise<Obras[]>;
  getObraById(id: string): Promise<any>;

  //DetailsObra
  addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras>;

  //TaxesObra
  registerTaxe(data: TaxesData): Promise<TaxesObra>;
}
