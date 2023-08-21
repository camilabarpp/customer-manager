import {Telephone} from "./customer.model";

export interface UpdatedCustomerData {
  id?: string;
  name?: string;
  type?: string;
  cpf?: string;
  cnpj?: string;
  rg?: string;
  ie?: string;
  phoneNumbers?: Telephone[];
}
