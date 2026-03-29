import { atjrApi } from "../../config/api/atjrApi";
import { TransactionResponse } from "../../infrastructure/interfaces/transaction.response";

export const addTransaction = async (payload: {
    effective_date: string;
    type: "CREDIT" | "DEBIT";
    amount: string;
    truck_id: number | null;
    payment_source_id: number | null;
    reference: string | null;
    notes: string | null;
}) => {
    try {
        const { data } = await atjrApi.post<TransactionResponse>("/diesel", payload);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
