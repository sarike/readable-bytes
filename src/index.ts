export enum BASE {
  TWO = 2,
  TEN = 10,
}
const UNITS = {
  [BASE.TWO]: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
  [BASE.TEN]: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
};

function toFixed(value: number, n: number) {
  const m = Math.pow(10, n);
  return Math.round(value * m) / m;
}

export function parseBytes(value: number, base: BASE = BASE.TEN) {
  const bytes = Number(value);
  const absValue = Math.abs(bytes);
  const step =
    base === BASE.TWO
      ? 1024 // Math.pow(2, 10)
      : 1000; // Math.pow(10, 3)
  if (!Number.isFinite(absValue)) {
    throw new TypeError("value can not be used as a finite number");
  }
  let i;
  if (absValue === 0) i = 0;
  else {
    i =
      base === BASE.TWO
        ? Math.floor(Math.log2(absValue) / 10)
        : Math.floor(Math.log10(absValue) / 3);
  }
  const j = Math.min(i, UNITS[base].length - 1);
  const v = toFixed(absValue / Math.pow(step, j), 2);
  return {
    value: absValue === 0 ? 0 : v * (value / absValue),
    unit: UNITS[base][j],
  };
}

export default function readableBytes(bytes: number, base: BASE = BASE.TEN) {
  const { value, unit } = parseBytes(bytes, base);
  return `${value} ${unit}`;
}
