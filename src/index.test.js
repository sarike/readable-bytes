import readableBytes from './index'

test('throw Error when use with invalid value', () => {
    expect(() => readableBytes('hello')).toThrow('value can not be used as a finite number')
    expect(() => readableBytes('1000', 'AB')).toThrow('unit must be one string of [B, KB, MB, GB, TB, PB, EB, ZB, YB]')
})

test('hello readable base 10 bytes', () => {
    expect(readableBytes(1000)).toBe('1 KB')
    expect(readableBytes(1001)).toBe('1 KB')
    expect(readableBytes(1000 * 1000)).toBe('1 MB')
    expect(readableBytes(1000 * 1000 + '')).toBe('1 MB')
    expect(readableBytes(1e9)).toBe('1 GB')
    expect(readableBytes(1e27)).toBe('1000 YB')
    expect(readableBytes(1e27, 'ZB')).toBe('1000000 ZB')
    expect(readableBytes(1000 * 1000, 'KB')).toBe('1000 KB')
    expect(readableBytes(-1000)).toBe('-1 KB')
})

test('hello readable base 2 bytes', () => {
    expect(readableBytes(1024, null, 2)).toBe('1 KB')
    expect(readableBytes(-1024, null, 2)).toBe('-1 KB')
})