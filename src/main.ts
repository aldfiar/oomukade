import {
    CreateTransactionRequestBody,
    CreateTransactionResponse,
    EstimateResponse,
    pusher,
    Query,
    RouteOption,
    RouteStep
} from "./client";
import {createLogger} from "./logger";

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
    const response = await pusher.fetchTransactionEstimate(request)
    return response
}

export const createTransaction = async (fromUser: string, recipient: string, query: Query, route: RouteStep[], estimate: EstimateResponse): Promise<CreateTransactionResponse> => {
    const request: CreateTransactionRequestBody = {
        from: fromUser,
        recipient: recipient,
        routing: {
            query: query,
            route: route
        },
        estimate: estimate
    }
    return await pusher.createTransaction(request)
}

