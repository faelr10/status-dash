import { Test, TestingModule } from '@nestjs/testing';
import { TaxesService } from '../taxes.service';
import { randomHoursWorked, randomSalary } from './mocks';
import {
  BASIC_FOOD_BASKET_VALUE,
  BDI_PERCENTAGE,
  COFFE_VALUE,
  FGTS_PERCENTAGE,
  FGTS_THIRTEENTH_PERCENTAGE,
  FINE_DISMISSAL_PERCENTAGE,
  HOURS_DEFAULT,
  HOURS_DEFAULT_DAY,
  THIRTEENTH_PERCENTAGE,
  TRANSPORT_VALUE,
  VACATION_PERCENTAGE,
  VACATION_THIRD_PERCENTAGE,
} from '../../constants';

describe('AppService', () => {
  let service: TaxesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxesService],
    }).compile();

    service = module.get<TaxesService>(TaxesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the proportional value of the basic basket', async () => {
    const hours = randomHoursWorked;
    const value = service.calculatedBasicFoodBasket(hours);

    expect(
      Number(((hours * BASIC_FOOD_BASKET_VALUE) / HOURS_DEFAULT).toFixed(2)),
    ).toBe(value);
  });

  it('should return the proportional value of the coffe dailly ', () => {
    const hours = randomHoursWorked;
    const value = service.calculatedCoffeDailly(hours);

    expect(Number(((hours / HOURS_DEFAULT_DAY) * COFFE_VALUE).toFixed(2))).toBe(
      value,
    );
  });

  it('should return the proportional value of the transport ', () => {
    const hours = randomHoursWorked;
    const value = service.calculatedTransport(hours);

    expect(
      Number(((hours / HOURS_DEFAULT_DAY) * TRANSPORT_VALUE).toFixed(2)),
    ).toBe(value);
  });

  it('should return the proportional value of the salary ', () => {
    const hours = randomHoursWorked;
    const salary_full = Number(randomSalary);
    const value = service.calculatedSalary(salary_full, hours);

    expect(Number(((salary_full / HOURS_DEFAULT) * hours).toFixed(2))).toBe(
      value,
    );
  });

  it('should return the proportional value of the fgts ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedFgts(salary);

    expect(Number((salary * FGTS_PERCENTAGE).toFixed(2))).toBe(value);
  });

  it('should return the proportional value of the 13 ', () => {
    const salary = Number(randomSalary);
    const value = service.calculated13(salary);

    expect(Number((salary * THIRTEENTH_PERCENTAGE).toFixed(2))).toBe(value);
  });

  it('should return the proportional value of the Fgts13 ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedFgts13(salary);

    expect(Number((salary * FGTS_THIRTEENTH_PERCENTAGE).toFixed(2))).toBe(
      value,
    );
  });

  it('should return the proportional value of the vacation ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedVacation(salary);

    expect(Number((salary * VACATION_PERCENTAGE).toFixed(2))).toBe(value);
  });

  it('should return the proportional value of the vacation one third ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedVacationOneThird(salary);

    expect(Number((salary * VACATION_THIRD_PERCENTAGE).toFixed(2))).toBe(value);
  });

  it('should return the proportional value of the fine dismissal ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedFineDismissal(salary);

    expect(Number((salary * FINE_DISMISSAL_PERCENTAGE).toFixed(2))).toBe(value);
  });

  it('should return the proportional value of the BDI ', () => {
    const salary = Number(randomSalary);
    const value = service.calculatedBDI(salary);

    expect(Number((salary * BDI_PERCENTAGE).toFixed(2))).toBe(value);
  });
});
