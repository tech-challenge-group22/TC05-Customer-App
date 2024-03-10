export interface MaskCustomerInformationInputDTO {
   // id:  number;
    cpf: string;
    nome: boolean;
    email: boolean;
    telefone: boolean;
    pagamento: boolean;
  }
  
  export interface MaskCustomerInformationOutputDTO {
    hasError: boolean;
    message?:string[];
  }
  