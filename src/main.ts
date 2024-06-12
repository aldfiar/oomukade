import {pusher,} from "./client";
import {createLogger} from "./logger";
import {Query} from "./types";
import {CreateTransactionResponse, EstimateResponse, ScanResponse, TransactionDetails} from "./client/types";

const logger = createLogger();

export const scanRoute = async (query: Query): Promise<ScanResponse[]> => {
    return await pusher.scanForRoutes(query)
}

export const estimatePrice = async (query: Query): Promise<EstimateResponse | undefined> => {
    const result = await scanRoute(query)
    const scanResult = result.pop()
    if (scanResult != undefined) {
        return await estimatePriceForRoute(scanResult);
    }
    return undefined;
}

export const estimatePriceForRoute = async (scan: ScanResponse): Promise<EstimateResponse | undefined> => {
    const {priceImpact: _, ...request} = scan;
    return await pusher.fetchTransactionEstimate(request)
}

export const createTransactionForRoute = async (fromUser: string, recipient: string, scan: ScanResponse, estimate: EstimateResponse): Promise<CreateTransactionResponse | undefined> => {
    const {priceImpact: _, ...routing} = scan;
    const request: TransactionDetails = {
        from: fromUser,
        recipient: recipient,
        estimate: estimate,
        routing: routing
    }
    return await pusher.createTransaction(request)
}

export const createTransaction = async (fromUser: string, recipient: string, query: Query): Promise<CreateTransactionResponse | undefined> => {
    const result = await scanRoute(query)
    const scanResult = result.pop()
    if (scanResult != undefined) {
        const estimate = await estimatePriceForRoute(scanResult);
        if (estimate != undefined) {
            return await createTransactionForRoute(fromUser, recipient, scanResult, estimate);
        }
        return undefined;
    }
    return undefined;

}




