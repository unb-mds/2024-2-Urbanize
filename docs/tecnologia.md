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

- **React.js:** Biblioteca principal para criar interfaces de usuário baseadas em componentes.  

- **TypeScript:** Superset do JavaScript que adiciona tipagem estática e facilita a manutenção do 
código.  

- **Leaflet:** Biblioteca para criação de mapas interativos e integração com camadas de geolocalização.  

- **React-Range:** Utilizada para criar controles deslizantes leves e customizáveis.  

- **TailwindCSS:** Ferramenta para estilizar os componentes e o layout da aplicação.  

- **Bibliotecas de Ícones:** `react-icons` ou SVGs personalizados (como os ícones de marcadores no mapa).  




- **Vite:** Para build e desenvolvimento

- **TypeScript:** Linguagem principal.


- **Component Libraries:**

    Material UI
    
    DaisyUI
    
    Mamba UI


---
**Ferramentas de build e desenvolvimennto**

*Vite ou Create React App*

- Ferramenta para configurar e rodar o ambiente React rapidamente.

**Gerenciamento de Estado e Dados**

- useState / useEffect -> Hooks nativos do React para gerenciamento de estado e efeitos colaterais.

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
- **Swagger:** Utilizado para a documentação interativa das APIs, proporcionando uma maneira prática de explorar e testar rotas diretamente através de uma interface visual.
- **Cron Job:** Utilizado para automatizar a execução periódica de tarefas, como a atualização dos dados, sem a necessidade de intervenção manual. O Cron Job está configurado para rodar periodicamente, garantindo que os dados estejam sempre atualizados com a frequência definida no código.

---

# API

Uma **API** (Application Programming Interface, ou Interface de Programação de Aplicações) é um conjunto de definições e protocolos que permite que diferentes sistemas ou softwares se comuniquem entre si de maneira estruturada e padronizada..

**Tecnologias Utilizadas:**

- **Axios:** é uma biblioteca JavaScript usada para fazer requisições HTTP de maneira simples e eficiente. Ela funciona tanto em navegadores quanto em ambientes Node.js, permitindo que você se conecte a APIs ou servidores, envie dados e receba respostas.

A fonte dos dados extraídos pelo api: [Obrasgov](https://api.obrasgov.gestao.gov.br/obrasgov/api/swagger-ui/index.html#/Execu%C3%A7%C3%A3o%20F%C3%ADsica/buscarPorFiltro_1)

---

# Banco de Dados

O **banco de dados** armazena de forma dinâmica e inteligente todos os dados necessários para abastecer o **Urbanize**. Ele é o repositório central onde os dados coletados e processados são mantidos, garantindo que estejam acessíveis e organizados para consultas e análises.


Veja sua modelagem:

<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/unb-7/diagrams/urbanize/embed"></iframe>

**Tecnologias Utilizadas:**

- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional de código aberto, usado para armazenar e gerenciar os dados de forma eficiente e segura. Ele oferece suporte a operações complexas e é altamente escalável, adequado para o volume e a complexidade dos dados no Urbanize.

---


## Documentos importantes


A equipe utilizou o **[Miro](https://miro.com/app/board/uXjVL093sYc=/)** como ferramenta principal para organizar o projeto de forma colaborativa e eficiente. Por meio dele, conseguimos criar fluxogramas, mapas mentais e painéis visuais que facilitaram a comunicação e o alinhamento das ideias. Além disso, o Miro nos permitiu documentar as etapas do desenvolvimento e acompanhar o progresso de cada tarefa em tempo real, promovendo maior integração entre os membros do time.

