export interface CurveToken {
    symbol: string,
    wrappedSymbol: string,
    address: string,
    wrappedAddress: string,
    chainId: string

}

export interface QuerySwapParams {
    tokenIn: string,
    tokenOut: string,
    chainIdIn: number,
    chainIdOut: number,
    amount: number,
}

export interface SwapRoute {
    query: {
        params: {
            tokenIn: string;
            tokenOut: string;
            amountIn: string;
            chainIdIn: number;
            chainIdOut: number;
        };
        slippage: number;
    };
    route: Object[];
    amountIn: string;
    amountInWithoutSlippage: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    priceImpact: string;
    totalFee: {
        type: string;
        percent: string;
        amount: string;
    };
}

export interface SwapResponse {
    routes: SwapRoute[];
}

export interface RouteParams {

}

export interface RouteEstimateResponse {
    priceInDollars: number;
    executionPrice: number;
    stablePrice: number;
    workerFee: number;
    deadline: number;
    signature: string;
}

export interface TransactionParams {
    from: string;
    recipient: string;
    permit: {
        v: number;
        r: string;
        s: string;
    };
    routing: Object;
    estimate: Object;
}

export interface CreateTransactionResponse {
    transaction_hash: string
}


export interface TransactionStatusParams {
    transaction_hash: string
}

export interface TransactionStatusResponse {

}