import { RequestOptions } from "./types";

// T is the response type
export async function makeGetRequest<T>(
    token: string,
    uri: string,
    isJsonResponse: boolean = true,
    options: RequestOptions = {}
): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = isJsonResponse ? await response.json() : await response.text();
        return data as T;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
        // If it's not an Error instance, throw a new Error with a generic message
        throw new Error('An unknown error occurred');
    } finally {
        clearTimeout(timeoutId);
    }
}

// T is the response type, U is the body type
export async function makePostRequest<T, U = any>(
    token: string,
    uri: string,
    body: U,
    isJsonResponse: boolean = true,
    options: RequestOptions = {}
): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

    try {
        const headers: Record<string, string> = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(uri, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = isJsonResponse ? await response.json() : await response.text();
        return data as T;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
        // If it's not an Error instance, throw a new Error with a generic message
        throw new Error('An unknown error occurred');
    } finally {
        clearTimeout(timeoutId);
    }
}