export function calculatedBasicFoodBasket(hours: number): number {
  return Number(((hours * 164.9) / 220).toFixed(2));
}

export function calculatedCoffeDailly(hours: number): number {
  return Number(((hours / 8) * 4.5).toFixed(2));
}

export function calculatedTransport(hours: number): number {
  return Number(((hours / 8) * 12.5).toFixed(2));
}

export function calculatedSalary(salaryFull: number, hours: number): number {
  return Number(((salaryFull / 220) * hours).toFixed(2));
}
