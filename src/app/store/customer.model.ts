export interface Customer {
    id: string;
    name: string;
    type: TypeCustomer;
    cpf?: string;
    cnpj?: string;
    rg?: string;
    ie?: string;
    registerDate?: Date;
    phoneNumbers: Telephone[];
}

export interface Telephone {
    id?: string;
    number: string;
}

export enum TypeCustomer {
    PF = 'PF',
    PJ = 'PJ'
}
