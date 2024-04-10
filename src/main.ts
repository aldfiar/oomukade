import {pusher,} from "./client";
import {createLogger} from "./logger";
import {Query, RouteOption} from "./types";
import {CreateTransactionRequest, CreateTransactionResponse, EstimateResponse} from "./client/types";

const logger = createLogger();

export const scanRoute = async (query: Query): Promise<RouteOption[]> => {
    return await pusher.scanForRoutes(query)
}

export const estimatePrice = async (query: Query): Promise<EstimateResponse | undefined> => {
    const result = await scanRoute(query)
    const route = result.pop()
    if (route != undefined) {
        return await estimatePriceForRoute(route);
    }
    logger.warn(`Can't find estimate price without route. Received: ${result.length} routes`)
    return undefined;
}

export const estimatePriceForRoute = async (route: RouteOption): Promise<EstimateResponse> => {
    const {priceImpact: _, ...request} = route;
    return await pusher.fetchTransactionEstimate(request)
}

export const createTransactionForRoute = async (fromUser: string, recipient: string, route: RouteOption, estimate: EstimateResponse): Promise<CreateTransactionResponse> => {
    const {priceImpact: _, ...routing} = route;
    const request: CreateTransactionRequest = {
        from: fromUser,
        recipient: recipient,
        routing: routing,
        estimate: estimate
    }
    return await pusher.createTransaction(request)
}

export const createTransaction = async (fromUser: string, recipient: string, query: Query): Promise<CreateTransactionResponse | undefined> => {
    const result = await scanRoute(query)
    const route = result.pop()
    if (route != undefined) {
        const estimate = await estimatePriceForRoute(route);
        return await createTransactionForRoute(fromUser, recipient, route, estimate)
    }
    logger.warn(`Can't create transaction for query: ${query}`)
    return undefined;
}




