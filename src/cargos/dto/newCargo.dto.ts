import { IsString } from 'class-validator';

export class NewCargoDto {
  @IsString()
  nome: string;

  @IsString()
  salario: string;
}
