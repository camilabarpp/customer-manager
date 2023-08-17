export interface Customer {
    id?: number;
    name: string;
    type: TypeCustomer;
    cpf?: string;
    cnpj?: string;
    rg?: string;
    ie?: string;
    registerDate?: Date;
    isActive: boolean;
    phoneNumbers: Telephone[];
}

interface Telephone {
    number: string;
}

enum TypeCustomer {
    PF = 'Pessoa Física',
    PJ = 'Pessoa Jurídica'
}
