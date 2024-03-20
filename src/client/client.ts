import axios from 'axios';
import {CREATE_TRANSACTION, ESTIMATE, FIND_ROUTE, SEARCH_TRANSACTION} from "./endpoints";
import {
    CreateTransactionResponse,
    QuerySwapParams,
    RouteEstimateResponse,
    RouteParams,
    SwapResponse,
    TransactionParams,
    TransactionStatusParams,
    TransactionStatusResponse
} from "../types";
import {logger} from "../logger";

export const REST_ADDRESS = "pusher.eywa.fi"
const endpoint = '/users/me';


export const getRoute = async (params: QuerySwapParams): Promise<SwapResponse | undefined> => {
    try {
        const response = await axios.post<SwapResponse>(REST_ADDRESS + FIND_ROUTE);
        return response.data;
    } catch (error) {
        logger.error(`Can't get route for parameters: ${params} because of: ${error}`)
        return undefined;
    }
}

export const getEstimates = async (params: RouteParams): Promise<RouteEstimateResponse | undefined> => {
    try {
        const response = await axios.post<RouteEstimateResponse>(REST_ADDRESS + ESTIMATE, params);
        return response.data;
    } catch (error) {
        logger.error(`Can't get route for parameters: ${params} because of: ${error}`)
        return undefined;
    }
}

export const createTransaction = async (params: TransactionParams): Promise<CreateTransactionResponse | undefined> => {
    try {
        const response = await axios.post<CreateTransactionResponse>(REST_ADDRESS + CREATE_TRANSACTION, params);
        return response.data;
    } catch (error) {
        logger.error(`Can't get route for parameters: ${params} because of: ${error}`)
        return undefined;
    }
}

export const getTransactionStatus = async (params: TransactionStatusParams): Promise<TransactionStatusResponse | undefined> => {
    try {
        const response = await axios.get<TransactionStatusResponse>(REST_ADDRESS + SEARCH_TRANSACTION(params.transaction_hash));
        return response.data;
    } catch (error) {
        logger.error(`Can't get route for parameters: ${params} because of: ${error}`)
        return undefined;
    }
}
