const client = require('twilio');

export default class TwilioSMSAdapter {
    private accountId: string;
    private authToken: string;
    private phoneNumber: string;

    constructor() {
        this.accountId = `${process.env.TWILIO_ACCOUNT_ID}`;
        this.authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
        this.phoneNumber = `${process.env.TWILIO_PHONE_NUMBER}`
    }

    async execute(params: {to: string, text: string}): Promise<any> {
        try {
            const configTwilio = client(this.accountId, this.authToken);
            configTwilio.messages
                .create({
                    body: params.text,
                    from: this.phoneNumber,
                    to: params.to
                })
                .then((message: any) => console.log(message.sid))  
        } catch (error) {
            console.log(error);
        }
    }

}