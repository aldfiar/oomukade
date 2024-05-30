export interface Params {
    tokenIn: string;
    chainIdIn: number;
    tokenOut: string;
    chainIdOut: number;
    amountIn: string;
}

`1`
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

export interface Estimate {
    executionPrice: string;
    workerFee: string;
    deadline: string;
    signature: string;
}

export interface RouteOption extends Amounts {
    query: Query;
    route: Route[];
    amountInUsd: number;
    amountOutUsd: number;
    amountOutWithoutSlippageUsd: number;
    priceImpact?: number;
    totalFee: Fee;
}

export interface RouteParams {
    tokenIn: Token;
    chainIdIn: number;
    tokenOut: Token;
    chainIdOut: number;
    amountIn: string;
    amountInWithoutSlippage: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    slippage: number;
}

export interface Route {
    type: string;
    chainId: number;
    params: RouteParams;
    pool?: Pool;
    fees: Fee[];
}

export interface TokenLogo {
    [size: string]: string;
}

export interface Token {
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
    logos?: TokenLogo;
    coins?: string[];
    real?: Token;
    realToken?: Token;
}

export interface Fee {
    type: string; // 'eywaStableSwapFee' | 'bridgeFee' | 'total' etc.
    token?: Token;
    percent: string;
    amount: string;
}

export interface Pool {
    address: string;
    coins: string[];
    decimals: number[];
    logos: TokenLogo;
    lp: Token; // Assuming lp is a type of token with additional properties
}
