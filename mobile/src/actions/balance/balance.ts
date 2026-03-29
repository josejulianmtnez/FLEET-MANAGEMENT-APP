import { atjrApi } from "../../config/api/atjrApi";
import { BalanceResponse } from "../../infrastructure/interfaces/balance.response";

export const balance = async () => {
    try {
        const { data } = await atjrApi.get<BalanceResponse>('/diesel/balance');
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
