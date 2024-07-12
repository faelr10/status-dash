import {
  calculated13,
  calculatedBDI,
  calculatedFgts,
  calculatedFgts13,
  calculatedFineDismissal,
  calculatedVacation,
  calculatedVacationOneThird,
} from './calculatedTaxes';
import {
  calculatedBasicFoodBasket,
  calculatedCoffeDailly,
  calculatedSalary,
  calculatedTransport,
} from './calculatedOthers';

export async function CalculatedAllImpostos(obra): Promise<any> {
  const hoursPerPosition = {};
  const hours_worked_value = {};

  //IMPOSTOS
  const taxes = {};
  const others = {};

  obra.DadosObras.forEach((element) => {
    const cargo = element.funcionario.cargo.nome;
    const horasTrabalhadas = element.horas_trabalhadas;

    //Calculo de salario proporcional as horas trabalhadas
    hours_worked_value[cargo] = calculatedSalary(
      element.funcionario.cargo.salario,
      horasTrabalhadas,
    );

    //Calculo de FGTS
    taxes[cargo] = {
      ...taxes[cargo],
      fgts: calculatedFgts(hours_worked_value[cargo]),
    };

    //Calculo de 13 salario
    taxes[cargo] = {
      ...taxes[cargo],
      thirteen_salary: calculated13(hours_worked_value[cargo]),
    };

    //Calculo do fgts em cima do 13
    taxes[cargo] = {
      ...taxes[cargo],
      fgts_13_salary: calculatedFgts13(taxes[cargo].thirteen_salary),
    };

    //Calculo de ferias + 1/3 de ferias
    taxes[cargo] = {
      ...taxes[cargo],
      vacation: calculatedVacation(hours_worked_value[cargo]),
    };
    taxes[cargo] = {
      ...taxes[cargo],
      vacation_one_third: calculatedVacationOneThird(taxes[cargo].vacation),
    };

    //Calculo de multa FGTS
    taxes[cargo] = {
      ...taxes[cargo],
      fine_dismissal: calculatedFineDismissal(taxes[cargo].fgts),
    };

    //Calculo de 20% de encargos
    taxes[cargo] = {
      ...taxes[cargo],
      bdi: calculatedBDI(hours_worked_value[cargo]),
    };

    //Calculo cesta_basica
    others[cargo] = {
      ...others[cargo],
      basic_food_basket: calculatedBasicFoodBasket(horasTrabalhadas),
    };

    //Calculo cafe
    others[cargo] = {
      ...others[cargo],
      coffe_dailly: calculatedCoffeDailly(horasTrabalhadas),
    };

    //Calculo vale transporte
    others[cargo] = {
      ...others[cargo],
      transport: calculatedTransport(horasTrabalhadas),
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
