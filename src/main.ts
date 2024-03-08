import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import CustomerRoute from './infrastructure/api/customer.route';
import AWSSQSAdapter from './application/adapters/AWSSqsAdapter';

dotenv.config();
const server = new ExpressAdapter();

const customerRoute = new CustomerRoute(server);

server.router(CustomerRoute);

server.listen(3000);
const queueService = AWSSQSAdapter.getInstance();
