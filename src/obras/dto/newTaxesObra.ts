import { IsString } from 'class-validator';
import { TaxesData } from '../structure';

export class NewTaxeObraDto implements TaxesData {
  @IsString()
  date: string;

  @IsString()
  obra_id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;
}
