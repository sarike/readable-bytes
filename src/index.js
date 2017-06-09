const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const BASE_2 = 2
const BASE_10 = 10

function toFixed(value, n) {
    const m = Math.pow(10, n)
    return Math.round((value * m)) / m
}

function parseBytes(value, unit, base) {
    const bytes = Number(value)
    const absValue = Math.abs(bytes)
    const step = base === BASE_2
        ? 1024 // Math.pow(2, 10)
        : 1000 // Math.pow(10, 3)
    if (!Number.isFinite(absValue)) {
        throw new TypeError('value can not be used as a finite number')
    }
    if (unit) {
        const i = UNITS.indexOf(unit)
        if (Object.prototype.toString.call(unit) !== '[object String]' || i === -1) {
            throw new RangeError(`unit must be one string of [${UNITS.join(', ')}]`)
        }
        return {
            value: toFixed((absValue / Math.pow(step, i)), 2),
            unit,
        }
    }
    const i = base === BASE_2
        ? Math.floor(Math.log2(absValue) / 10)
        : Math.floor(Math.log10(absValue) / 3)
    const j = Math.min(i, UNITS.length - 1)
    const v = toFixed((absValue / Math.pow(step, j)), 2)
    return {value: v * (value/absValue), unit: UNITS[j]}
}

export default function readableBytes(bytes, unitStr, base) {
    const {value, unit} = parseBytes(bytes, unitStr, base)
    return `${value} ${unit}`
}
