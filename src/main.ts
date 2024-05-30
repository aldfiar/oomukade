import {pusher,} from "./client";
import {createLogger} from "./logger";
import {Query} from "./types";
import {CreateTransactionRequest, CreateTransactionResponse, EstimateResponse, ScanResponse} from "./client/types";

const logger = createLogger();

export const scanRoute = async (query: Query): Promise<ScanResponse> => {
    return await pusher.scanForRoutes(query)
}

export const estimatePrice = async (query: Query): Promise<EstimateResponse | undefined> => {
    const result = await scanRoute(query)
    return await estimatePriceForRoute(result);
}

export const estimatePriceForRoute = async (scan: ScanResponse): Promise<EstimateResponse> => {
    const {priceImpact: _, ...request} = scan;
    return await pusher.fetchTransactionEstimate(request)
}

export const createTransactionForRoute = async (fromUser: string, recipient: string, scan: ScanResponse, estimate: EstimateResponse): Promise<CreateTransactionResponse> => {
    const {priceImpact: _, ...routing} = scan;
    const request: CreateTransactionRequest = {
        from: fromUser,
        recipient: recipient,
        estimate: estimate,
        route: scan.route
    }
    return await pusher.createTransaction(request)
}

export const createTransaction = async (fromUser: string, recipient: string, query: Query): Promise<CreateTransactionResponse | undefined> => {
    const result = await scanRoute(query)
    const estimate = await estimatePriceForRoute(result);
    return await createTransactionForRoute(fromUser, recipient, result, estimate)
}




