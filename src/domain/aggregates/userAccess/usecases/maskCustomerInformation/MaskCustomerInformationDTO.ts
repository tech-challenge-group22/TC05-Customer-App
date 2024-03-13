export interface MaskCustomerInformationInputDTO {
   // id:  number;
    cpf: string;
    name: boolean;
    email: boolean;
    telephone: boolean;
    payment: boolean;
  }
  
  export interface MaskCustomerInformationOutputDTO {
    hasError: boolean;
    message?:string[];
  }
  