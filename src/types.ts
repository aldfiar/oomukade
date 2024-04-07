// Located in types.ts

// Interface for the body of a request to scan for cross-chain routes
export interface ScanRequestBody {
    params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: string;
        chainIdIn: number;
        chainIdOut: number;
    };
    slippage: number;
}

// Redefined RouteOption based on provided JSON structure
export interface RouteOption {
    query: {
        params: {
            tokenIn: string;
            chainIdIn: number;
            tokenOut: string;
            chainIdOut: number;
            amountIn: string;
        };
        slippage: number;
    };
    route: RouteStep[];
    amountIn: string;
    amountInUsd: number;
    amountOut: string;
    amountOutWithoutSlippage: string;
    amountOutUsd: number;
    amountOutWithoutSlippageUsd: number;
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

export interface Logos {
    [size: string]: string; // Example: "16": "https://..."
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

// Interface for the body of a request to fetch a transaction estimate
// Note: Adjust as necessary if different from RouteOption
export interface EstimateRequestBody {
    query: {
        params: {
            tokenIn: string;
            chainIdIn: number;
            tokenOut: string;
            chainIdOut: number;
            amountIn: string;
        };
        slippage: number;
    };
    route: RouteStep[]; // Assuming the full route information is needed for an estimate
}

// Updated EstimateResponse to reflect the structure of the provided JSON response
export interface EstimateResponse {
    priceInDollars: string;
    executionPrice: string;
    stablePrice: string;
    workerFee: string;
    deadline: string;
    signature: string;
}


// Interface for the body of a request to create a transaction
export interface CreateTransactionRequestBody {
    from: string;
    recipient: string;
    permit?: {
        v: number;
        r: string;
        s: string;
    };
    routing: RouteStep[]; // Assuming the need for detailed route information
    estimate: EstimateResponse;
}

// Define this interface based on the specific API's response for creating a transaction
export interface CreateTransactionResponse {
    // Example fields, adjust according to your API's response
    transactionId: string;
    status: string;
    message?: string;
}

// Interface for the request body to create a transaction
// Assuming this structure for Query which matches your previous usage
export interface Query {
    params: {
        tokenIn: string;
        chainIdIn: number;
        tokenOut: string;
        chainIdOut: number;
        amountIn: string;
    };
    slippage: number;
}