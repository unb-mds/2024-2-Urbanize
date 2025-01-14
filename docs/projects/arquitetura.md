# Arquitetura e Tecnologias

O **Urbanize** é constituído de cinco componentes principais:

- **Frontend:** Responsável pela interface de usuário, onde os usuários interagem com o sistema. Ele exibe os dados de maneira clara e acessível, permitindo que os usuários façam pesquisas e visualizem gráficos e análises.

- **Backend/API:** Gerencia a lógica de negócios e atua como intermediário entre o frontend e o banco de dados. Ele processa as solicitações dos usuários, executa as regras de negócio e retorna os dados apropriados para o frontend.

- **Banco de Dados:** Armazena e organiza os dados necessários para o funcionamento do Urbanize. É o repositório central onde todos os dados coletados, processados e organizados são mantidos para acesso e consulta.

**Arquitetura do Urbanize**


Para fornecer uma visão clara de como esses componentes interagem e se integram no sistema, o diagrama abaixo ilustra a arquitetura geral do Urbanize. Nele, é possível visualizar o fluxo de dados e a relação entre cada um dos componentes descritos acima, desde a coleta de dados no SODF até a apresentação dos resultados para o usuário final.

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVLI0DWAY=/?moveToViewport=-69,-202,1222,563&embedId=271195419009" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

---

**Descrição dos componentes**

A seguir, apresentamos uma visão detalhada de cada componente do **Urbanize**. As escolhas tecnológicas feitas para cada parte do sistema refletem o compromisso da equipe de desenvolvimento em utilizar soluções modernas e eficientes, assegurando robustez e facilidade de manutenção.


## Frontend

O **frontend** é interface visual do Urbanize, composto por três páginas principais, organiza em gráficos os dados coletados.

**Tecnologias utilizadas:**

- **Next.js:** Framework React para renderização no lado do servidor (SSR) e geração de sites estáticos, proporcionando uma performance melhorada e SEO otimizado.
- **Tailwind CSS:** Framework de utilitários CSS que permite um design responsivo e customizável.
- **TypeScript:** Linguagem que adiciona tipagem estática ao JavaScript, aumentando segurança e previsibilidade do código.
- **Axios:** Biblioteca para requisições HTTP, estabelecendo a comunicação com a API.
- **Vitest:** Ferramenta de testes unitários JavaScript, permitindo a execução rápida e eficiente dos testes.
- **Testing Library:** Conjunto de utilitários que possibilita renderizar os componentes em ambiente de teste.
- **ESLint:** Ferramenta de linting que identifica e corrige problemas de estilo e padrões no código, garantindo a qualidade e consistência.
- **Sonner:** Biblioteca para exibição de notificações na interface, tornando mensagens de erro e alertas amigáveis.
- **ApexCharts:** Biblioteca para criação de gráficos interativos e visualizações de dados, proporcionando uma apresentação rica e personalizável das informações.

---

## Backend/API

O **backend/API** é responsável pela busca, regras de negócio e tratamento dos dados. Para maior robustez e facilidade de manutenção, a API foi estruturada seguindo os princípios da **Clean Architecture**, dividida em três camadas principais:


- **Infrastructure:** Esta camada contém os elementos de infraestrutura necessários para a execução do sistema, incluindo a configuração do servidor, a conexão com o banco de dados, e a implementação dos serviços externos. Ela lida com as operações mais próximas ao sistema operacional e ao ambiente de execução.

- **Adapters:** Os adaptadores são responsáveis por fazer a ponte entre o mundo externo e o núcleo da aplicação. Eles transformam as entradas e saídas, adaptando-as para serem compreendidas pela camada de aplicação. Incluem controllers que recebem as requisições HTTP e repositórios que abstraem o acesso ao banco de dados.

- **Application:** Esta camada contém a lógica de negócio central do sistema. Ela orquestra as operações, aplica as regras de negócio e interage com as outras camadas através de interfaces definidas. O foco é garantir que as regras de negócio sejam cumpridas de maneira consistente e independente da tecnologia usada nas outras camadas. No Urbanize, inclui os services.

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVLI7Bos4=/?moveToViewport=-586,-180,1222,563&embedId=128042769159" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

**Tecnologias utilizadas:**

- **Express:** Framework para construção de APIs e servidores web em Node.js, facilitando a criação e gerenciamento de rotas.
- **Vitest:** Ferramenta de testes unitários JavaScript, permitindo a execução rápida e eficiente dos testes.
- **TypeScript:** Linguagem que adiciona tipagem estática ao JavaScript, aumentando segurança e previsibilidade do código.
- **Nodemon:** Ferramenta que reinicia automaticamente o servidor Node.js quando mudanças são detectadas, agilizando o desenvolvimento.
- **ESLint:** Ferramenta de linting que identifica e corrige problemas de estilo e padrões no código, garantindo a qualidade e consistência.
- **Swagger:** Ferramenta para documentação interativa de APIs, permitindo a exploração e testes das rotas da API.

---

## API

Uma **API** (Application Programming Interface, ou Interface de Programação de Aplicações) é um conjunto de definições e protocolos que permite que diferentes sistemas ou softwares se comuniquem entre si de maneira estruturada e padronizada..

**Tecnologias Utilizadas:**

- **Axios:** é uma biblioteca JavaScript usada para fazer requisições HTTP de maneira simples e eficiente. Ela funciona tanto em navegadores quanto em ambientes Node.js, permitindo que você se conecte a APIs ou servidores, envie dados e receba respostas.

A fonte dos dados extraídos pelo api: [Obrasgov](https://api.obrasgov.gestao.gov.br/obrasgov/api/swagger-ui/index.html#/Execu%C3%A7%C3%A3o%20F%C3%ADsica/buscarPorFiltro_1)

---

## Banco de Dados

O **banco de dados** armazena de forma dinâmica e inteligente todos os dados necessários para abastecer o **Urbanize**. Ele é o repositório central onde os dados coletados e processados são mantidos, garantindo que estejam acessíveis e organizados para consultas e análises.


Veja sua modelagem:

<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/unb-7/diagrams/urbanize/embed"></iframe>

**Tecnologias Utilizadas:**

- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional de código aberto, usado para armazenar e gerenciar os dados de forma eficiente e segura. Ele oferece suporte a operações complexas e é altamente escalável, adequado para o volume e a complexidade dos dados no Urbanize.

---

## Início

Siga os passos abaixo para executar o **backend** do [**Urbanize**](#):

### Ambiente e Pré-requisitos

Para rodar o projeto é fundamental ter algumas dependências globais:

- Node
- Docker

Para visualizar versões, links e as instruções completas de configuração do ambiente: [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/)


### Instalação

Após configurar o [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/), em um diretório de sua máquina, abra o terminal e execute:

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git
```

Com o repositório do backend devidamente clonado, você terá acesso à aplicação **Express** e ao **Scraper**:

### **Express/API**

Navegue até o diretório raiz do repositório clonado:

```bash
cd 2024-2-Urbanize
```
Em seguida instale as dependências do Urbanize:

```bash
npm install
```

### **Cron Job**

## Automação com Cron Job

O projeto utiliza um **Cron Job** para automatizar a requisição de dados das obras diretamente da API do site do governo. Esta funcionalidade garante que as informações estejam sempre atualizadas sem a necessidade de intervenção manual.

## Funcionamento do Cron Job

O Cron Job já está configurado no projeto para executar periodicamente o script de requisição de dados. Ele está integrado ao sistema, eliminando a necessidade de configurações adicionais. O script responsável por esta automação está localizado em:

```plaintext
<diretorio-do-projeto>/scripts/update_data.py
```

Por padrão, o Cron Job é executado a cada 24 horas para assegurar que as informações estejam sempre atualizadas. Caso seja necessário verificar ou ajustar a frequência, a alteração dos marcadores pode ser feito diretamente no código do projeto.

# Documentação com Swagger

O projeto utiliza o **Swagger** para documentar os Endpoints do backend e facilitar os testes. A interface interativa permite explorar os Endpoints, enviar requisições e visualizar as respostas diretamente pelo navegador.

## Acessando o Swagger UI

1. Certifique-se de que o servidor backend esteja em execução.
2. Acesse o Swagger UI pelo navegador utilizando o endereço padrão:

```plaintext
https://two024-2-urbanize.onrender.com/api-docs/
```

A interface exibirá todos os Endpoints disponíveis, junto com as seguintes informações:

- Métodos HTTP suportados (**GET**, **POST**, **PUT**, **DELETE**, etc.).
- Parâmetros necessários.
- Exemplos de requisições e respostas.

## Benefícios do Swagger

- Facilita a compreensão da API para desenvolvedores e testers.
- Auxilia na realização dos testes diretamente na interface, sem a necessidade de ferramentas externas.
- Garante que a documentação esteja sincronizada com os Endpoints implementados.

Certifique-se de que quaisquer alterações ou novos Endpoints no backend sejam devidamente documentados no Swagger para manter a consistência da documentação.


### Execução

### **Express/API**

Para executar a aplicação Express em sua máquina, execute no diretório raiz:

```bash
npm run start
```
O servidor será inicializado e estará disponível na porta 3001 do localhost:

```bash
http://localhost:3333/
```

Demais comandos para execução de testes, builds e linter podem ser encontrados na guia _scripts_  do arquivo `package.json` na pasta raiz.

Com a api rodando localmente é possível acessar sua documentação e testá-la no **Swagger**, basta acessar:

```bash
http://localhost:3001/api-docs
```



---

### Guia de contribuição

**Para acessar o guia completo de contribuição**: [**Guia de Contribuição**](https://unb-mds.github.io/2024-2-Urbanize/)

---



