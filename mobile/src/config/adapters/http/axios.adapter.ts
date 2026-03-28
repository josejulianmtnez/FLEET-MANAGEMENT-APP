import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

interface Options {
    baseUrl : string;
    params  : Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {

    private axiosInstance: AxiosInstance;

    constructor( options: Options ) {
        this.axiosInstance = axios.create({
            baseURL: options.baseUrl,
            params: options.params,
        })
    }

    async get<T>(url: string, options?: Record<string, unknown> | undefined): Promise<T> {
        try {

            const { data } = await this.axiosInstance.get<T>(url, options);

            return data;

        } catch (error) {
            throw new Error(`Error fetching get: ${url}`);
        }
    }

     async post<T>(url: string, data: any, options?: Record<string, unknown>): Promise<T> {
        try {
            const { data: response } = await this.axiosInstance.post<T>(url, data, options);
            return response;
        } catch (error: any) {
            if (error.response) {
                console.error('Error response post:', error.response);
                throw {
                    message: error.response.data?.message,
                    response: error.response
                };
            } else if (error.request) {
                console.error('Error request post:', error.request);
            } else {
                console.error('Error message post:', error.message);
            }
            throw new Error(`Error fetching post: ${url}`);
        }
    }
}