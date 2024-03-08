import IQueueService from '../ports/IQueueService';
import * as dotenv from 'dotenv';
import { SQS } from 'aws-sdk';
import cron from 'node-cron';
import CustomerController from '../../domain/aggregates/userAccess/controllers/CustomerController';

export default class AWSSQSAdapter implements IQueueService {
    private sqs = new SQS();
    private AWS = require('aws-sdk');
    private static _instance: AWSSQSAdapter;

    private constructor() {
        dotenv.config();

        this.AWS.config.update({ region: process.env.AWS_REGION });

        const polling_interval = Number(process.env.MSG_POLLING_INTERVAL);

        //exemple:
        // cron.schedule('*/5 * * * * *', .....)
        cron.schedule('*/' + polling_interval.toString() + ' * * * * *', () => {
            this.receiveMessage();
        });
    }

    static getInstance(): AWSSQSAdapter {
        if (!this._instance) {
            this._instance = new AWSSQSAdapter();
        }
        return this._instance;
    }

    async receiveMessage() {
        try {
            const receiveParams: SQS.Types.ReceiveMessageRequest = {
                QueueUrl: `${process.env.AWS_INPUT_PAYMENT_STATUS_NOTIFICATION_URL}`,
                MaxNumberOfMessages: 10,
                WaitTimeSeconds: 5,
            };

            const data = await this.sqs.receiveMessage(receiveParams).promise();
            if (data.Messages && data.Messages.length > 0) {
                for (const element of data.Messages) {
                    const message = element;
                    // Process the message
                    // { "customer_id": 1, "order_id": 33, "status": "Aprovado" }
                    const msgBody = JSON.parse(String(message.Body));
                    console.log(msgBody)

                    await CustomerController.notifyCustomer({
                        customer_id: Number(msgBody.customer_id),
                        order_id: Number(msgBody.order_id),
                        payment_status: msgBody.payment_status,
                    });

                    await this.sqs
                        .deleteMessage({
                            QueueUrl: `${process.env.AWS_INPUT_PAYMENT_STATUS_NOTIFICATION_URL}`,
                            ReceiptHandle: message.ReceiptHandle!,
                        })
                        .promise();
                }
                console.log('Message deleted.');
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    // Implement timestamp logical here
    messageID(): number {
        return Date.now();
    }
}
