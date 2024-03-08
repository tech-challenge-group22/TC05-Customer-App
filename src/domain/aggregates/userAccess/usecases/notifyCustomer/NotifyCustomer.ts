import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import { customerInfo } from "../listCustomer/ListCustomerDTO";
import { NotifyCustomerInputDTO, NotifyCustomerOutputDTO } from "./NotifyCustomerDTO";

export default class NotifyCustomer implements UseCaseInterface {
    private readonly repository: ICustomerRepository;

    constructor(repository: ICustomerRepository) {
        this.repository = repository;
    }

    async execute(input: NotifyCustomerInputDTO): Promise<NotifyCustomerOutputDTO> {
        try {
            const customer = await this.repository.getCustomerById(input.customer_id);
            const customerOutput = this.transformToOutput(customer[0]);

            const message = `Usuário ${customerOutput.email} seu pedido de número ${input.order_id} está com status ${input.payment_status}`;
            console.log(message);

            // TO-DO: Notificar usuário

            const output: NotifyCustomerOutputDTO = {
                hasError: false,
                message: ['Usuário notificado com sucesso'],
            };

            return output;
        } catch (error) {
            const output: NotifyCustomerOutputDTO = {
                hasError: true,
                message: ['Usuário não notificado'],
            };
            return output;
        }
    }

    private transformToOutput(result: any): customerInfo {
        const output: customerInfo = {
            id: result.id,
            cpf: result.cpf.value,
            name: result.name,
            email: result.email.value,
            isActive: result.isActive,
        };

        return output;
    }
}
