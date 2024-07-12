export function calculatedFgts(value: number): number {
  return Number((value * 0.08).toFixed(2));
}

export function calculated13(value: number): number {
  return Number((value * 0.0833).toFixed(2));
}

export function calculatedFgts13(value: number): number {
  return Number((value * 0.08).toFixed(2));
}

export function calculatedVacation(value: number): number {
  return Number((value * 0.0833).toFixed(2));
}

export function calculatedVacationOneThird(value: number): number {
  return Number((value * 0.33).toFixed(2));
}

export function calculatedFineDismissal(value: number): number {
  return Number((value * 0.5).toFixed(2));
}

export function calculatedBDI(value: number): number {
  return Number((value * 0.2).toFixed(2));
}
