export function bitwiseFlags<FlagRecord extends Record<string, number>>(
  flagRecord: FlagRecord,
  ...flags: (keyof FlagRecord)[]
): number {
  // eslint-disable-next-line no-bitwise
  return flags.reduce((a, b) => a | flagRecord[b], 0);
}
