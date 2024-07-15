import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxesService {
  async CalculatedAllImpostos(obra): Promise<any> {
    const hoursPerPosition = {};
    const hours_worked_value = {};

    //IMPOSTOS
    const taxes = {};
    const others = {};

    obra.DadosObras.forEach((element) => {
      const cargo = element.funcionario.cargo.nome;
      const horasTrabalhadas = element.horas_trabalhadas;

      //Calculo de salario proporcional as horas trabalhadas
      hours_worked_value[cargo] = this.calculatedSalary(
        element.funcionario.cargo.salario.replace('.', '').replace(',', '.'),
        horasTrabalhadas,
      );

      //Calculo de FGTS
      taxes[cargo] = {
        ...taxes[cargo],
        fgts: this.calculatedFgts(hours_worked_value[cargo]),
      };

      //Calculo de 13 salario
      taxes[cargo] = {
        ...taxes[cargo],
        thirteen_salary: this.calculated13(hours_worked_value[cargo]),
      };

      //Calculo do fgts em cima do 13
      taxes[cargo] = {
        ...taxes[cargo],
        fgts_13_salary: this.calculatedFgts13(taxes[cargo].thirteen_salary),
      };

      //Calculo de ferias + 1/3 de ferias
      taxes[cargo] = {
        ...taxes[cargo],
        vacation: this.calculatedVacation(hours_worked_value[cargo]),
      };
      taxes[cargo] = {
        ...taxes[cargo],
        vacation_one_third: this.calculatedVacationOneThird(
          taxes[cargo].vacation,
        ),
      };

      //Calculo de multa FGTS
      taxes[cargo] = {
        ...taxes[cargo],
        fine_dismissal: this.calculatedFineDismissal(taxes[cargo].fgts),
      };

      //Calculo de 20% de encargos
      taxes[cargo] = {
        ...taxes[cargo],
        bdi: this.calculatedBDI(hours_worked_value[cargo]),
      };

      //Calculo cesta_basica
      others[cargo] = {
        ...others[cargo],
        basic_food_basket: this.calculatedBasicFoodBasket(horasTrabalhadas),
      };

      //Calculo cafe
      others[cargo] = {
        ...others[cargo],
        coffe_dailly: this.calculatedCoffeDailly(horasTrabalhadas),
      };

      //Calculo vale transporte
      others[cargo] = {
        ...others[cargo],
        transport: this.calculatedTransport(horasTrabalhadas),
      };

      if (!hoursPerPosition[cargo]) {
        hoursPerPosition[cargo] = 0;
      }

      hoursPerPosition[cargo] += horasTrabalhadas;
    });
    const data_obra = Object.keys(hoursPerPosition).map((cargo) => {
      return {
        function: cargo,
        total_hours: hoursPerPosition[cargo],
        hours_worked_value: hours_worked_value[cargo],
        taxes: taxes[cargo],
        others: others[cargo],
      };
    });
    return data_obra;
  }

  private calculatedBasicFoodBasket(hours: number): number {
    return Number(((hours * 164.9) / 220).toFixed(2));
  }

  private calculatedCoffeDailly(hours: number): number {
    return Number(((hours / 8) * 4.5).toFixed(2));
  }

  private calculatedTransport(hours: number): number {
    return Number(((hours / 8) * 12.5).toFixed(2));
  }

  private calculatedSalary(salaryFull: number, hours: number): number {
    return Number(((salaryFull / 220) * hours).toFixed(2));
  }

  private calculatedFgts(value: number): number {
    return Number((value * 0.08).toFixed(2));
  }

  private calculated13(value: number): number {
    return Number((value * 0.0833).toFixed(2));
  }

  private calculatedFgts13(value: number): number {
    return Number((value * 0.08).toFixed(2));
  }

  private calculatedVacation(value: number): number {
    return Number((value * 0.0833).toFixed(2));
  }

  private calculatedVacationOneThird(value: number): number {
    return Number((value * 0.33).toFixed(2));
  }

  private calculatedFineDismissal(value: number): number {
    return Number((value * 0.5).toFixed(2));
  }

  private calculatedBDI(value: number): number {
    return Number((value * 0.2).toFixed(2));
  }
}
