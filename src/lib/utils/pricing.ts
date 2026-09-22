export const BDT_RATE = 130;
export const PLATFORM_MARKUP = 1.1;

export function applyPlatformFee(usd: number): number {
  return Math.round(usd * PLATFORM_MARKUP * 100) / 100;
}

export function toBdt(usd: number): number {
  return Math.round(usd * BDT_RATE);
}
