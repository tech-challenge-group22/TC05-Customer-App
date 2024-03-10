import UseCaseInterface from "../../../../sharedKernel/usecase/UseCaseInterface";
import ICustomerRepository from "../../core/ports/ICustomerRepository";
import ICustomerSendEmail from "../../core/ports/ICustomerSendEmail";
import ICustomerSendSMS from "../../core/ports/ICustomerSendSMS";
import { customerInfo } from "../listCustomer/ListCustomerDTO";
import {
	NotifyCustomerInputDTO,
	NotifyCustomerOutputDTO,
} from "./NotifyCustomerDTO";

export default class NotifyCustomer implements UseCaseInterface {
	private readonly repository: ICustomerRepository;
	private readonly sendEmail: ICustomerSendEmail;
	private readonly sendSMS: ICustomerSendSMS;

	constructor(
		repository: ICustomerRepository,
		sendEmail: ICustomerSendEmail,
		sendSMS: ICustomerSendSMS
	) {
		this.repository = repository;
		this.sendEmail = sendEmail;
		this.sendSMS = sendSMS;
	}

	async execute(
		input: NotifyCustomerInputDTO
	): Promise<NotifyCustomerOutputDTO> {
		try {
			const customer = await this.repository.getCustomerById(
				input.customer_id
			);
			const customerOutput = this.transformToOutput(customer[0]);

			const message = `Usuário ${customerOutput.email} seu pedido de número ${input.order_id} está com status ${input.payment_status}`;
			if (customerOutput.email !== null && customerOutput.email !== "") {
				this.sendEmail.execute({
					to: customerOutput.email,
					text: message,
				});
			}
			if (
				customerOutput.telephone !== null &&
				customerOutput.telephone !== ""
			) {
				this.sendSMS.execute({
					to: customerOutput.telephone,
					text: message,
				});
			}

			const output: NotifyCustomerOutputDTO = {
				hasError: false,
				message: ["Usuário notificado com sucesso"],
			};

			return output;
		} catch (error) {
			const output: NotifyCustomerOutputDTO = {
				hasError: true,
				message: ["Usuário não notificado"],
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
			telephone: result.telephone,
			isActive: result.isActive,
		};

		return output;
	}
}
