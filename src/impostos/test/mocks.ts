import { faker } from '@faker-js/faker';

export const randomHoursWorked = faker.number.int({ min: 1, max: 999 });
export const randomSalary = faker.finance.amount({ min: 1000, max: 9999 });
