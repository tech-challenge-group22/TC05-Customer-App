import ListCustomer from '../usecases/listCustomer/ListCustomer';
import MySQLCustomerRepository from '../gateways/MySQLCustomerRepository';
import {
  ListCustomerInputDTO,
  ListCustomerOutputDTO,
} from '../usecases/listCustomer/ListCustomerDTO';
import CreateCustomer from '../usecases/createCustomer/CreateCustomer';
import {
  CreateCustomerInputDTO,
  CreateCustomerOutputDTO,
} from '../usecases/createCustomer/CreateCustomerDTO';
import {
  DeleteCustomerInputDTO,
  DeleteCustomerOutputDTO,
} from '../usecases/deleteCustomer/DeleteCustomerDTO';
import DeleteCustomer from '../usecases/deleteCustomer/DeleteCustomer';
import UpdateCustomer from '../usecases/updateCustomer/UpdateCustomer';
import {
  UpdateCustomerInputDTO,
  UpdateCustomerOutputDTO,
} from '../usecases/updateCustomer/UpdateCustomerDTO';
import { 
  MaskCustomerInformationInputDTO ,
  MaskCustomerInformationOutputDTO,
} from '../usecases/maskCustomerInformation/MaskCustomerInformationDTO';
import DeleteInformation from '../usecases/maskCustomerInformation/MaskCustomerInformation';
import NotifyCustomer from '../usecases/notifyCustomer/NotifyCustomer';
import { NotifyCustomerInputDTO, NotifyCustomerOutputDTO } from '../usecases/notifyCustomer/NotifyCustomerDTO';
import NodemailerAdapter from '../../../../application/adapters/NodemailerAdapter';
import TwilioSMSAdapter from '../../../../application/adapters/TwilioSMSAdapter';

export default class CustomerController {
  static async getCustomers(
    searchId?: number,
    searchCPF?: string,
  ): Promise<any> {
    const listUseCase: ListCustomer = new ListCustomer(
      new MySQLCustomerRepository(),
    );
    const input: ListCustomerInputDTO = {
      params: {
        id: searchId,
        cpf: searchCPF,
      },
    };
    const output: ListCustomerOutputDTO = await listUseCase.execute(input);
    return output;
  }

  static async createCustomer(body: string): Promise<any> {
    const createUseCase: CreateCustomer = new CreateCustomer(
      new MySQLCustomerRepository(),
    );
    const input: CreateCustomerInputDTO =
      body as unknown as CreateCustomerInputDTO;
    const output: CreateCustomerOutputDTO = await createUseCase.execute(input);
    return output;
  }

  static async updateCustomer(
    body: string,
    id: number,
  ): Promise<UpdateCustomerOutputDTO> {
    const updateUseCase = new UpdateCustomer(new MySQLCustomerRepository());
    let input: UpdateCustomerInputDTO =
      body as unknown as UpdateCustomerInputDTO;
    input.id = id;
    const output: UpdateCustomerOutputDTO = await updateUseCase.execute(input);
    return output;
  }

  static async deleteCustomer(id: number): Promise<any> {
    const deleteUseCase = new DeleteCustomer(new MySQLCustomerRepository());
    const input: DeleteCustomerInputDTO = { id };
    const output: DeleteCustomerOutputDTO = await deleteUseCase.execute(input);
    return output;
  }

  static async maskCustomerInformation(body:string , cpf: string): Promise<any> {
    const maskedCustomerInformation = new DeleteInformation(new MySQLCustomerRepository());
    const input: MaskCustomerInformationInputDTO = body as unknown as MaskCustomerInformationInputDTO;
    input.cpf = cpf
    const output: MaskCustomerInformationOutputDTO = await maskedCustomerInformation.execute(input);
  }
  static async notifyCustomer({ customer_id, order_id, payment_status }: { customer_id: number, order_id: number, payment_status: string }): Promise<any> {
    const notifyCustomerUseCase = new NotifyCustomer(new MySQLCustomerRepository(), new NodemailerAdapter(), new TwilioSMSAdapter());
    const input: NotifyCustomerInputDTO = { customer_id, order_id, payment_status };
    const output: NotifyCustomerOutputDTO = await notifyCustomerUseCase.execute(input);
    return output;
  }
}
