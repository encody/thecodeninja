import { ICharge, isPaid } from './Charge';
import { IMemberTerm } from './MemberTerm';
import { IModel } from './Model';
import { IWaiver } from './Waiver';

export interface IMember {
  name: string;
  institutionId: string;
  memberType: string;
  accountId: string;
  graduationYear: number;
  source: string;
  referralMember: string;
  terms: { [termId: string]: IMemberTerm | undefined };
  waivers: IWaiver[];
}

export function hasPaidForTerm(
  member: IMember,
  chargeType: string,
  allCharges: IModel['charges'],
  termId: string,
): boolean {
  const term = member.terms[termId];
  if (!term) {
    return false;
  }

  return (
    term.ledger.length > 0 &&
    term.ledger.every(chargeId => {
      const charge = allCharges[chargeId];
      return !!charge && charge.chargeType === chargeType && isPaid(charge);
    })
  );
}
export function getUnpaid(
  member: IMember,
  chargeType: string,
  allCharges: IModel['charges'],
  termId: string,
): ICharge[] {
  const term = member.terms[termId];
  if (!term) {
    return [];
  }

  const charges = term.ledger.flatMap(chargeId => {
    const charge = allCharges[chargeId];
    return charge && charge.chargeType === chargeType && !isPaid(charge)
      ? [charge]
      : [];
  });

  return charges;
}

export function hasUnpaid(
  member: IMember,
  chargeType: string,
  allCharges: IModel['charges'],
  termId: string,
): boolean {
  const term = member.terms[termId];
  if (!term) {
    return false;
  }

  return term.ledger.some(chargeId => {
    const charge = allCharges[chargeId];
    return !!charge && charge.chargeType === chargeType && !isPaid(charge);
  });
}

export function isActiveMember(member: IMember, termId: string): boolean {
  return !!member.terms[termId];
}

export function hasMembership(
  member: IMember,
  membership: string,
  termId: string,
): boolean {
  const term = member.terms[termId];

  return !!term && term.memberships.includes(membership);
}
