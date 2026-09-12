import { Context } from './Context';
declare class SumoError extends Error {
    isSumoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { SumoError };
