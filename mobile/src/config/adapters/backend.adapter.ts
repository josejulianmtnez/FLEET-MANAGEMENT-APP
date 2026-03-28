import { BACKEND_URL } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const backend = new AxiosAdapter({
    baseUrl: BACKEND_URL,
    params: {},
})
