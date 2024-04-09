import {Amounts, Fee, Query, RouteStep} from "../types";

export interface CreateTransactionRequestBody {
    from: string;
    recipient: string;
    routing: {
        query: Query;
        route: RouteStep[];
    }
    estimate: EstimateResponse;
}

export interface CreateTransactionResponse {
    to: string;
    abi: string;
    args: [
        string[],
        string[],
        {}
    ]
    message?: string;
}

export interface EstimateRequestBody extends Amounts {
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