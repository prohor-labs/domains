export const BDT_RATE = 140;
export const PLATFORM_MARKUP = 1.10;

export function applyPlatformFee(usd: number): number {
  return Math.round(usd * PLATFORM_MARKUP * 100) / 100;
}

export function toBdt(usd: number): number {
  return Math.round(usd * BDT_RATE);
}
