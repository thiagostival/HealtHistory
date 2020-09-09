<h4 align="center">
<img src="./img/logo.png" width="auto" />
</h4>

### :muscle: Projeto

<b>HealtHistory</b> é uma aplicação para guardar o histórico médico de um paciente, com a utilização de blockchain para tal armazenamento.

O aplicativo é um MVP de uma arquitetura projetada (que pode ser acessada [clicando aqui](https://drive.google.com/drive/folders/1_8aXOpiHB0Wq38vrm_5xxrrl6KIaSLTR?usp=sharing)) que apresenta como integrar arquiteturas de software para sistemas de registros médicos pessoais com blockchain.

O HealtHistory é uma forma de avaliação da viabilidade prática de uma aplicação desenvolvida sobre essa arquitetura.

Para a rede blockchain, foi utilizada a [Hyperledger](https://www.hyperledger.org/), que é uma solução open source de redes blockchains. Que é utilizada na cloud da IBM, onde ela disponibiliza um plugin para o Visual Studio Code ([disponível aqui](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)), onde é possível criar uma rede localmente e instanciar contratos inteligentes, e assim poder fazer os testes, e esse mesmo contrato inteligente pode ser instanciado na cloud da IBM.

<br>

### :iphone: Demo

![](./img/video.gif)

<br>

### :rocket: Tecnologias usadas
Este projeto foi desenvolvido com as seguintes tecnologias:
  - #### Blockchain:
    - Hyperledger Fabric
    - IBM Blockchain Plataform
  - #### Backend:
    - [Node.js](https://nodejs.org/en/)
    - [Express](https://github.com/expressjs/express)
      - [Cors](https://github.com/expressjs/cors)
      - [Multer](https://github.com/expressjs/multer)
    - [TypeOrm](https://github.com/typeorm/typeorm):
      - Postgres
    - [IORedis](https://github.com/luin/ioredis)
      - Redis DB
    - [Celebrate](https://github.com/arb/celebrate)
    - [Class-Transformer](https://github.com/typestack/class-transformer)
    - [Handlebars](https://github.com/ericf/express-handlebars)
    - [Node Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible)
    - [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
    - [fabric-network: "~1.4.2"](https://hyperledger-fabric.readthedocs.io/en/latest/)
  - #### Frontend:
    - [React](https://pt-br.reactjs.org/)
    - [React Spring](https://github.com/react-spring/react-spring)
    - [Styled-Components](https://github.com/styled-components/styled-components)
    - [Polished](https://github.com/styled-components/polished)
    - [Axios](https://github.com/axios/axios)
    - [Yup](https://github.com/jquense/yup)
    - [Unform](https://github.com/Rocketseat/unform)

### 👨🏻‍💻 Execução

Para rodar o projeto:
  - #### Blockchain:
    - Baixar o plugin [IBM Blockchain Plataform](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)
    - Criar uma rede blockchain localmente (Para isso é necessário ter o Docker e estar utilizando containers linux):
      - Caso a rede não tenha sido criada automáticamente na instalação do plugin, siga os próximos passos;
      - Na opção "Fabric Environments" clique no +;
      - Selecione a primeira opção "Create new from template";
      - Selecione a primeira opção "1 Org Template";
      - E coloque o nome da rede;
    - Instanciar o contrato inteligente:
      - Com o contrato inteligente aberto no VSCode, na opção "Smart Contracts" aperte nos 3 pontos e selecione "Package open project";
      - Clique na rede criada em "Fabric Environments";
      - Depois em "Install" presente em "Smart Contracts - Installed";
      - E selecione o contrato inteligente, caso apareça opções, de enter em todas;
      - Depois em "Instantiate" presente em "Smart Contracts - Instantiated";
      - E selecione o contrato inteligente, caso apareça opções, de enter em todas;
    - Com isso a rede está pronta para ser utilizada;
  - #### Backend:
    - Criar um arquivo <b>.env</b> seguindo o examplo do arquivo <b>.env.example</b>
    - Criar um arquivo <b>ormconfig.json</b> seguindo exemplo do arquivo <b>ormconfig.example.json</b>
    - Criar os containers docker do Postgres e ReadisDB:
      - `docker run --platform=linux --name <nomeescolhido> -e POSTGRES_PASSWORD=<senhaescolhida> -p 5432:5432 -d postgres` -> Criar container docker do Postgres;
      - `docker run --name <nomeescolhido> -p 6379:6379 -d -t redis:alpine` -> Criar container docker do RedisDB;
      - OBS: Se criar os containers com nomes diferentes aos quais estão no arquivo ormconfig.json, alterar o nome e senha dos bancos no código (alterar no arquivo ormconfig e no .env) de acordo com os colocados na criação do container docker;
    - Abrir a pasta do backend no terminal e executar:
      - `yarn` - Para baixar todas as dependências;
      - `yarn typeorm migration:run` -> Para realizar as migrations(criação das tabelas no banco de dados);
      - `yarn dev:server` -> Para executar o servidor NodeJS;
  - #### Frontend Mobile:
    - Abrir a pasta mobile no terminal e executar:
      - `yarn` -> Para instalar todas as dependências;
      - Android:
        - Iniciar o avd do android ou conectar o disposito via usb;
        - `adb reverse tcp:3333 tcp:3333` -> Para redirecionar o servidor Nodejs para o avd ou dispositivo;
        - `yarn start` -> Para iniciar o metroblunder;
        - `yarn android` -> Para iniciar o aplicativo no avd ou android;
      - IOS:
        - `yarn ios` -> Para iniciar o aplicativo no emulador;

<br>

### :mortar_board: Sobre o projeto

A aplicação e a arquitetura foram desenvolvidas durante a Iniciação Científica no Instituto de Informática da Universidade Federal de Goiás, sob orientação do Professor Valdemar Vicente Graciano Neto.

---
