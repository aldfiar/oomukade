import {createLogger} from "../../logger";

const logger = createLogger();

interface FetchOptions {
    method: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
}

async function fetchWithTimeout(url: string, options: FetchOptions, timeout = 3000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);
        if (!response.ok) {
            logger.warn(`Failed request: ${response.status} to ${url}`);
        }
        return response;
    } catch (error) {
        clearTimeout(id);
        logger.error(`Unknown error on request to ${url}`)
        throw error;
    }
}

async function get(url: string, timeout?: number): Promise<any> {
    try {
        const response = await fetchWithTimeout(url,
            {method: 'GET'},
            timeout);
        return response.json();
    } catch (error) {
        logger.error('GET request failed:', error);
        throw error;
    }
}

async function post(url: string, data: any, timeout?: number): Promise<any> {
    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }, timeout);
        return response.json();
    } catch (error) {
        logger.error('POST request failed:', error);
        throw error;
    }
}

export {get, post};
