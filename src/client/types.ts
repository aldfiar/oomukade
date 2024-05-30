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

interface RoutesForQuery {
    query: Query;
    route: Route[];
}

interface TransactionDetails {
    from: string;
    recipient: string;
    routing: RoutesForQuery;
    amountIn: string;
    amountOut: string;
    amountOutWithoutSlippage: string;
    tokenInPrice: number;
    tokenOutPrice: number;
}

interface EstimateDetails extends EstimateResponse {

}

export interface CreateTransactionRequest {
    from: string,
    recipient: string,
    estimate: EstimateDetails;
    route: Route[];
}

type FunctionParameters = [
    string[],
    string[],
    {
        executionPrice: string;
        deadline: string;
        v: number;
        r: string;
        s: string;
    }
];

export interface CreateTransactionResponse {
    to: string;
    abi: string;
    args: [string[], string[], FunctionParameters];
    value: string;
}

