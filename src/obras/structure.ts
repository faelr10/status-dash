import { Obras } from '@prisma/client';
import { NewObraDto } from './dto/newObra';

export interface IObraService {
  newObra(obra: NewObraDto): Promise<Obras>;
}

export interface IObraRepository {
  getObraByName(nome: string): Promise<Obras | null>;
  newObra(obra: NewObraDto): Promise<Obras>;
}
