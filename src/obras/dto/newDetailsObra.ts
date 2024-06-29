import { IsArray, IsString } from 'class-validator';

export class NewDetailsObraDto {
  @IsString()
  data: string;

  @IsString()
  obra_id: string;

  @IsArray()
  responsaveis: DetailsResp[];
}

export type DetailsResp = {
  horas: number;
  profissional: string;
};
