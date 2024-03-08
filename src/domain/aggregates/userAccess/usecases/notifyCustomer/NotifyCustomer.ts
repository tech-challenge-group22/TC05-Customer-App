import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import ICustomerSendEmail from "../../core/ports/ICustomerSendEmail";
import { customerInfo } from "../listCustomer/ListCustomerDTO";
import { NotifyCustomerInputDTO, NotifyCustomerOutputDTO } from "./NotifyCustomerDTO";

export default class NotifyCustomer implements UseCaseInterface {
    private readonly repository: ICustomerRepository;
    private readonly sendEmail: ICustomerSendEmail;

    constructor(repository: ICustomerRepository, sendEmail: ICustomerSendEmail) {
        this.repository = repository;
        this.sendEmail = sendEmail;
    }

    async execute(input: NotifyCustomerInputDTO): Promise<NotifyCustomerOutputDTO> {
        try {
            const customer = await this.repository.getCustomerById(input.customer_id);
            const customerOutput = this.transformToOutput(customer[0]);
            
            const message = `Usuário ${customerOutput.email} seu pedido de número ${input.order_id} está com status ${input.payment_status}`;
            this.sendEmail.execute({to: customerOutput.email, text: message});

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
