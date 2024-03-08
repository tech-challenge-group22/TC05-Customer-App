export default interface ICustomerSendEmail {
    execute(
        params: { to: string, text: string }
    ): Promise<any>;
}
