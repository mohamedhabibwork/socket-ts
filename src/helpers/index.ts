export function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}

export const parseJson = (content: string) => JSON.parse(content);
export const parseToString = (object: any) => JSON.stringify(object);

export interface Point {
    x: number;
    y: number;
}