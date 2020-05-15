import readableBytes, { parseBytes } from "./index";

test("throw Error when use with invalid value", () => {
  expect(() => readableBytes("hello" as any)).toThrow(
    "value can not be used as a finite number"
  );
});

test("zero bytes", () => {
  expect(readableBytes(0)).toBe("0 B");
});

test("hello readable base 10 bytes", () => {
  expect(readableBytes(1000)).toBe("1 KB");
  expect(readableBytes(1001)).toBe("1 KB");
  expect(readableBytes(1000 * 1000)).toBe("1 MB");
  expect(readableBytes(1e9)).toBe("1 GB");
  expect(readableBytes(1e27)).toBe("1000 YB");
  expect(readableBytes(-1000)).toBe("-1 KB");
});

test("hello readable base 2 bytes", () => {
  expect(readableBytes(1024, 2)).toBe("1 KiB");
  expect(readableBytes(-1024, 2)).toBe("-1 KiB");
});

test("hello parse bytes base 2", () => {
  const ret = parseBytes(1024, 2);
  expect(ret.value).toBe(1);
  expect(ret.unit).toBe('KiB');
});
