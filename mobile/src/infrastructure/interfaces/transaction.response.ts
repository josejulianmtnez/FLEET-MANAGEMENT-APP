export interface TransactionResponse {
    id:                number;
    effective_date:    Date;
    type:              string;
    amount:            string;
    truck_id:          null;
    payment_source_id: number;
    reference:         string;
    notes:             string;
    created_at:        Date;
}
