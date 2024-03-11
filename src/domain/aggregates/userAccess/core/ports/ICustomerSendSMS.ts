export default interface ICustomerSendSMS {
    execute(
        params: { to: string, text: string }
    ): Promise<any>;
}
