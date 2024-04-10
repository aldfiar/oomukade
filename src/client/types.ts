import {Amounts, Fee, Query, RouteOption, RouteStep} from "../types";

export interface CreateTransactionRequest {
    from: string;
    recipient: string;
    routing: RouteOption;
    estimate: EstimateResponse;
}

export interface CreateTransactionResponse {
    to: string;
    abi: string;
    args: [string[], string[], Tuple];
    value: string;
}

type Tuple = [
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

export interface EstimateRequest extends Amounts {
    query: Query;
    route: RouteStep[];
    amountInUsd: number;
    amountOutUsd: number;
    amountOutWithoutSlippageUsd: number;
    totalFee: Fee;
}

export interface EstimateResponse {
    priceInDollars: string;
    executionPrice: string;
    stablePrice: string;
    workerFee: string;
    deadline: string;
    signature: string;
}

