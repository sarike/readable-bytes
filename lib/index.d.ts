export declare enum BASE {
    TWO = 2,
    TEN = 10
}
export declare function parseBytes(value: number, base?: BASE): {
    value: number;
    unit: string;
};
export default function readableBytes(bytes: number, base?: BASE): string;
