import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IObraRepository, IObraService, ObrasData } from './structure';
import { NewObraDto } from './dto/newObra';
import { Obras } from '@prisma/client';
import { ObrasRepository } from './obras.repository';

@Injectable()
export class ObrasService implements IObraService {
  constructor(
    @Inject(ObrasRepository) private readonly repository: IObraRepository,
  ) {}

  async newObra(obra: NewObraDto): Promise<Obras> {
    const verifyExistObra = await this.repository.getObraByName(obra.nome);
    if (verifyExistObra) {
      throw new BadRequestException('Obra already exists');
    }
    const newObra = await this.repository.newObra(obra);
    return newObra;
  }

  async getObras(): Promise<ObrasData[]> {
    const obras = await this.repository.getObras();
    const obrasData: ObrasData[] = [];
    obras.map((obra) => {
      obrasData.push({
        id: obra.id,
        nome: obra.nome,
        construtora: obra.construtora,
        valor_final: obra.valor_final,
        dados_obra: [
          {
            funcao: 'Bombeiro 1',
            total_horas: '10',
            gastos_encargos: '3500',
          },
          {
            funcao: 'Auxiliar',
            total_horas: '20',
            gastos_encargos: '2000',
          },
          {
            funcao: 'Encarregado',
            total_horas: '30',
            gastos_encargos: '7800',
          },
        ],
      });
    });
    return obrasData;
  }

  async getObraById(id: string): Promise<ObrasData> {
    const obra = await this.repository.getObraById(id);
    if (!obra) {
      throw new BadRequestException('Obra not found');
    }

    const horasPorCargo = {};
    obra.DadosObras.forEach((element) => {
      const cargo = element.funcionario.cargo;
      const horasTrabalhadas = element.horas_trabalhadas;

      if (!horasPorCargo[cargo]) {
        horasPorCargo[cargo] = 0;
      }

      horasPorCargo[cargo] += horasTrabalhadas;
    });

    const dados_obra = Object.keys(horasPorCargo).map((cargo) => {
      return {
        funcao: cargo,
        total_horas: horasPorCargo[cargo],
        gastos_encargos: horasPorCargo[cargo] * 20,
      };
    });

    const obraData: ObrasData = {
      id: obra.id,
      nome: obra.nome,
      construtora: obra.construtora,
      valor_final: obra.valor_final,
      dados_obra,
    };

    return obraData;
  }
}
