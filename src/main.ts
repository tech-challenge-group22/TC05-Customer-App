import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import CustomerRoute from './infrastructure/api/customer.route';

dotenv.config();
const server = new ExpressAdapter();

const customerRoute = new CustomerRoute(server);

server.router(CustomerRoute);

server.listen(3000);
