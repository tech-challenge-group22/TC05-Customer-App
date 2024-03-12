export interface UpdateCustomerInputDTO {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  isActive: boolean;
}

export interface UpdateCustomerOutputDTO {
  hasError: boolean;
  message?: string[];
}
