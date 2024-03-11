export interface NotifyCustomerInputDTO {
    customer_id: number;
    order_id: number;
    payment_status: string;
}

export interface NotifyCustomerOutputDTO {
    hasError: boolean;
    message?: string[];
}
