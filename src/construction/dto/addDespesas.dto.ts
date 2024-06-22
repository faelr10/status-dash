import { IsNumber, IsString } from 'class-validator';

export class AddDespesaDto {
  @IsString()
  obrasId: string;

  @IsString()
  descricao: string;

  @IsNumber()
  valor: number;
}
