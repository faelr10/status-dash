import { Injectable, NotFoundException } from '@nestjs/common';
import { ConstructionRepository } from './const.repository';

export type AddDespesaParams = {
  obraId: string;
  descricao: string;
  valor: number;
};

@Injectable()
export class ConstructionService {
  constructor(private readonly repository: ConstructionRepository) {}

  async getAllConstructions(): Promise<any> {
    return this.repository.getAllConstructions();
  }

  async addDespesa(addDespesaDto: AddDespesaParams): Promise<any> {
    const verifyObra = await this.repository.getObraById(addDespesaDto.obraId);
    console.log(verifyObra);

    if (!verifyObra) {
      throw new NotFoundException('Obra não encontrada');
    }
    const newDespesa = await this.repository.addDespesa(addDespesaDto);
    return newDespesa;
  }

  async getDespesas(id: string): Promise<any> {
    const verifyObra = await this.repository.getObraById(id);
    if (!verifyObra) {
      throw new NotFoundException('Obra não encontrada');
    }

    //buscar funcionarios da obra
    const funcionarios = await this.repository.getFuncionariosByObra(id);
    //gerar array com nome dos funcionarios
    const funcionariosArray = funcionarios.map((funcionario) => {
      return funcionario.funcionarios.nome;
    });

    //calcular salario funcionarios
    const totalSalarios = funcionarios.reduce((acc, funcionario) => {
      return acc + funcionario.funcionarios.salario;
    }, 0);

    const despesasMateriaisExtrato = await this.repository.getDespesas(id);
    //somar despesas
    const despesasMaterial = despesasMateriaisExtrato.reduce((acc, despesa) => {
      return acc + despesa.valor;
    }, 0);

    const totalDespesas = totalSalarios + despesasMaterial;

    const response = {
      obra: verifyObra.nome,
      funcionarios: funcionariosArray,
      despesasFuncionarios: totalSalarios,
      despesasMaterial,
      totalDespesas,
      despesasMateriaisExtrato,
    };

    return response;
  }
}
