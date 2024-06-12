import {Fee, Query, Route} from "../types"

export interface ScanRequest extends Query {

}

export interface ScanResponse {
    query: Query;
    route: Route[];
    amountIn: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    tokenInPrice: number;
    tokenOutPrice: number;
    priceImpact: number;
    totalFee: Fee;
}

export interface EstimateRequest {
    query: Query;
    route: Route[];
    amountIn: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    tokenInPrice: number;
    tokenOutPrice: number;
}

export interface EstimateResponse {
    priceInDollars: string;
    executionPrice: string;
    stablePrice: string;
    workerFee: string;
    deadline: string;
    signature: string;
}

export interface RoutesForQuery {
    query: Query;
    route: Route[];
}

export interface TransactionDetails {
    from: string;
    recipient: string;
    routing: RoutesForQuery;
    estimate: EstimateResponse;
}

interface EstimateDetails extends EstimateResponse {

}


export interface FunctionParameters {
    executionPrice: string;
    deadline: string;
    v: number;
    r: string;
    s: string;
}

export interface CreateTransactionResponse {
    to: string;
    abi: string;
    args: [string[], string[], FunctionParameters];
    value: string;
}

