export interface Params {
    tokenIn: string;
    chainIdIn: number;
    tokenOut: string;
    chainIdOut: number;
    amountIn: string;
}

export interface Query {
    params: Params;
    slippage: number;
}

export interface Amounts {
    amountIn: string;
    amountInWithoutSlippage?: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    slippage: number;
}

export interface RouteParams extends Amounts {
    tokenIn: Token;
    chainIdIn: number;
    tokenOut: Token;
    chainIdOut: number;
}

export interface RouteOption extends Amounts {
    query: Query;
    route: RouteStep[];
    amountInUsd: number;
    amountOutUsd: number;
    priceImpact: number;
    totalFee: Fee;
}

export interface RouteStep {
    type: string;
    chainId: number;
    params: RouteParams;
    pool?: Pool;
    fees: Fee[];
}

export interface Token {
    logos?: Logos;
    chainId: number;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    tags: string[];
    permittable: boolean;
    permit: boolean;
    originalName: string;
    originalSymbol: string;
    coins?: string[];
}

export interface Pool {
    address: string;
    coins: string[];
    decimals: number[];
    logos: Logos;
    lp: Token;
}

export interface Fee {
    type: string;
    token?: Token;
    percent: string;
    amount: string;
}

export interface Logos {
    [size: string]: string;
}
