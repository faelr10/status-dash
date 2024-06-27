import { IsString } from 'class-validator';

export class NewFuncionarioDto {
  @IsString()
  nome: string;

  @IsString()
  cargo: string;
}
