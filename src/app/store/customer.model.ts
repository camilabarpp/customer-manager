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
    telephones: Telephone[];
}

interface Telephone {
    number: string;
}

enum TypeCustomer {
    PF = 'Pessoa Física',
    PJ = 'Pessoa Jurídica'
}
