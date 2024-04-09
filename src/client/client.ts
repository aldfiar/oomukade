import {Query, RouteOption,} from "../types";
import config, {ClientConfig} from "./config/clientConfig";
import {CREATE_TRANSACTION, ESTIMATE, FIND_ROUTE} from "./endpoints";
import {post} from "./utils/fetch";
import {CreateTransactionRequestBody, CreateTransactionResponse, EstimateRequestBody, EstimateResponse} from "./types";


export class PusherClient {
    private config: ClientConfig;

    constructor(config: ClientConfig) {
        this.config = config
    }

    async scanForRoutes(requestBody: Query): Promise<RouteOption[]> {
        const result = await post(`${this.config.baseUrl}${FIND_ROUTE}`, requestBody)
        return result as RouteOption[];
    }

    async fetchTransactionEstimate(requestBody: EstimateRequestBody): Promise<EstimateResponse> {
        const result = await post(`${this.config.baseUrl}${ESTIMATE}`, requestBody)
        return result as EstimateResponse;
    }

    async createTransaction(requestBody: CreateTransactionRequestBody): Promise<CreateTransactionResponse> {
        const result = await post(`${this.config.baseUrl}${CREATE_TRANSACTION}`, requestBody)
        return result as CreateTransactionResponse;
    }
}

export const pusher = new PusherClient(config);

