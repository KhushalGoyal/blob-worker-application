// import axios, { AxiosResponse } from "axios";

import { SuccessPayload } from "../entities/Entities";

export default class RequestHelper {
    async get(baseURL: string,
        endpoint?: string,
        params?: { [key: string]: any },
        headers?: { [key: string]: any }): Promise<SuccessPayload> {
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        const options = { params, headers };
        return { success: true }
        // return axios.get(url, options);
    }

    async post(baseURL: string,
        data: any,
        endpoint?: string,
        headers?: { [key: string]: any }): Promise<SuccessPayload> {
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        const options = { headers };
        return { success: true, data }
        // return axios.post(url, data, options);
    }
}