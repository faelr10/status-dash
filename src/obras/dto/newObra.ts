import { IsString } from 'class-validator';

export class NewObraDto {
  @IsString()
  nome: string;

  @IsString()
  construtora: string;

  @IsString()
  valor_final: string;
}
