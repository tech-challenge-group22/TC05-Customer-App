import { resolve } from 'path';
import UseCaseInterface from '../../../../sharedKernel/usecase/UseCaseInterface';
import ICustomerRepository from '../../core/ports/ICustomerRepository';
import ListCustomer from '../listCustomer/ListCustomer';
import { ListCustomerInputDTO, ListCustomerOutputDTO } from '../listCustomer/ListCustomerDTO';
import {
  MaskCustomerInformationInputDTO,
  MaskCustomerInformationOutputDTO,
} from './MaskCustomerInformationDTO';

export default class DeleteInformation implements UseCaseInterface {
  private readonly repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(
    input: MaskCustomerInformationInputDTO,
  ): Promise<MaskCustomerInformationOutputDTO> {
    try {
        const validateParams = this.validateMissingParams(input);
        const validateBody = this.validateBodyRequest(input);
        if (validateParams) {
          console.log("cai na validação")
          return validateParams;
        }
        if (validateBody) {
          return validateBody;
        }
        const listUseCase: ListCustomer = new ListCustomer(
          this.repository,
        );
        const  input_search: ListCustomerInputDTO = {
          params: {
            cpf: input.cpf
          },
        };

        const customer: ListCustomerOutputDTO = await listUseCase.execute(input_search);
        let return_result : any
        if (customer.result){
            let customerInfo = customer.result[0]

           if(input.email === true)
             customerInfo.email = 'anonymous@mail.com'
           if(input.telephone === true)
             customerInfo.telephone = ''
           if(input.name === true)
             customerInfo.name = 'Anonymous Customer'
            const result = await this.repository.updateCustomer(
              customerInfo.id,
              customerInfo.name,
              customerInfo.email,
              customerInfo.telephone,
              customerInfo.cpf,
              customerInfo.isActive
            );

            return_result  = result
        }

        const output: MaskCustomerInformationOutputDTO = {
        hasError: false,
        message: return_result,
      };
      return output;
    } catch (error: any) {
      const output = {
        hasError: true,
        message: error.hasOwnProperty('sqlMessage')
          ? [error.sqlMessage]
          : error,
      };

      return output;
    }
  }

  private validateBodyRequest(
    input: MaskCustomerInformationInputDTO,
  ): MaskCustomerInformationOutputDTO | undefined {
    if (Object.keys(input).length === 1 && input['cpf']) {
      return {
        hasError: true,
        message: ['Missing body'],
      };
    }
  }

  private validateMissingParams(
    input: MaskCustomerInformationInputDTO,
  ): MaskCustomerInformationOutputDTO | undefined {
    console.log(JSON.stringify(input))
    if (input.cpf === "undefined") {
      return {
        hasError: true,
        message: ['Missing parameters. Please provide cpf'],
      };
    }
  }
}
