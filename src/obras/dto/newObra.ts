import { IsNumber, IsString } from 'class-validator';

export class NewObraDto {
  @IsString()
  nome: string;

  @IsNumber()
  valor_final: number;
}
