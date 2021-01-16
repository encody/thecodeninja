import { IPayment } from './Payment';

export interface ICharge {
  id: string;
  accountId: string;
  term: string;
  value: number;
  note: string;
  chargeType: string;
  payments: IPayment[];
  start: number;
  end: number;
}

export function isPaid(charge: ICharge) {
  return amountPaid(charge) === charge.value;
}

export function isOverdue(charge: ICharge) {
  return Date.now() > charge.end && !isPaid(charge);
}

export function hasPayment(charge: ICharge) {
  return charge.payments.length > 0;
}

export function amountPaid(charge: ICharge) {
  return charge.payments.reduce((total, payment) => total + payment.value, 0);
}
