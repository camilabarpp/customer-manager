# Customer Manager

Customer Manager é um aplicativo de gerenciamento de clientes desenvolvido com Angular no front-end e Java Spring Boot no back-end. Ele permite que você cadastre, visualize, atualize e exclua informações de clientes, incluindo seus números de telefone. Este documento fornece uma visão geral do projeto, instruções de instalação e uso, além de informações sobre como contribuir.

## Conteúdo

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)

## Visão Geral

O Customer Manager é um sistema completo de gerenciamento de clientes, permitindo que os usuários executem as seguintes operações:

- Cadastro de clientes, incluindo nome, tipo (PF ou PJ), CPF, CNPJ, RG, IE e números de telefone.
- Visualização de informações detalhadas do cliente.
- Atualização das informações do cliente, incluindo a adição ou remoção de números de telefone.
- Exclusão de clientes do sistema.

O projeto é dividido em duas partes: o front-end desenvolvido em Angular e o back-end em Java Spring Boot. Isso permite uma separação clara entre a interface do usuário e a lógica de negócios.

## Tecnologias

- Angular: Framework de front-end para a criação de interfaces de usuário modernas e responsivas.
- Java Spring Boot: Framework de back-end para o desenvolvimento de aplicativos Java robustos.
- Banco de Dados (Banco de dados de sua escolha, como MySQL, PostgreSQL, etc.)
- RxJS: Biblioteca reativa para programação assíncrona.
- TypeScript: Superset do JavaScript usado no desenvolvimento Angular.
- HTML e CSS: Linguagens básicas para a construção da interface do usuário.

## Instalação

1. Clone o repositório: `git clone https://github.com/camilabarpp/customer-manager-frontend.git`
3. Instale as dependências do front-end: `npm install`
4. Clone o repositório do back-end: `git clone https://github.com/camilabarpp/customer-manager-backend.git`
5. Importe o projeto do back-end em sua IDE preferida e configure o banco de dados.
6. Inicie o back-end.

## Uso

1. Certifique-se de que o back-end está em execução.
2. Inicie o aplicativo: `npm start`
3. Abra seu navegador e acesse `http://localhost:4200`.

A partir daqui, você poderá usar as diferentes funcionalidades do Customer Manager, como cadastrar, visualizar, atualizar e excluir clientes.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie uma nova branch para sua feature ou correção: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'Adiciona nova feature'`
4. Faça um push para a branch: `git push origin minha-feature`
5. Abra um Pull Request neste repositório.
