# Execução

**Pré-requisitos**

NodeJS v20 ou superior
Python 3.12.3

**Clone o repositório do projeto:**

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git]
```



## **Back-end**

**Siga os passos abaixo para executar o **backend** do [**Urbanize**](#):**

### Ambiente e Pré-requisitos:

Para rodar o projeto é fundamental ter algumas dependências globais:

- Node
- Docker


### Instalação

Após configurar o [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-2-Urbanize/arquitetura/), em um diretório de sua máquina, abra o terminal e execute:

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git
```

Com o repositório do backend devidamente clonado, você terá acesso à aplicação **Express** :

### **Express/API**

Navegue até o diretório raiz do repositório clonado:

```bash
cd 2024-2-Urbanize
```
Em seguida instale as dependências do Urbanize:

```bash
npm install
```


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
<br>

***Cron Job***


 **Funcionamento do Cron Job**

O Cron Job já está configurado no projeto para executar periodicamente o script de requisição de dados. Ele está integrado ao sistema, eliminando a necessidade de configurações adicionais. O script responsável por esta automação está localizado em:

```plaintext
2024-2-Urbanize/backend/node/src/server.ts
```

Por padrão, o Cron Job é executado a cada 24 horas para assegurar que as informações estejam sempre atualizadas. Caso seja necessário verificar ou **ajustar** a frequência, a alteração dos marcadores pode ser feito **diretamente no código** do projeto.


### Acessando o Swagger UI

1. Certifique-se de que o servidor backend esteja em execução.
2. Acesse o Swagger UI pelo navegador utilizando o endereço padrão:

```plaintext
https://two024-2-urbanize.onrender.com/api-docs/
```

A interface exibirá todos os Endpoints disponíveis, junto com as seguintes informações:

- Métodos HTTP suportados (**GET**, **POST**, **PUT**, **DELETE**, etc.).
- Parâmetros necessários.
- Exemplos de requisições e respostas.








###  **Testes**

Nesse projeto estou utilizando testes unitários e testes de ponta a ponta (e2e) e para executar basta rodar os comandos:

```bash
# Testes unitários
$ npm run test

# Testes de ponta a ponta
$ npm run test:watch
```

Demais comandos para execução de testes, builds e linter podem ser encontrados na guia _scripts_  do arquivo `package.json` na pasta raiz.

Com a api rodando localmente é possível acessar sua documentação e testá-la no **Swagger**, basta acessar:

```bash
https://two024-2-urbanize.onrender.com/api-docs/
```




---


## **Front-end**

### Configuração do Ambiente:

### Pré-requisitos:
- **Node.js** (versão 14.18+)
- **npm** ou **yarn**

### Instalação

1 - **Navegue até a pasta do projeto**  
   ```bash
   cd C:\2024-2-Urbanize\frontend\vite-project
   ```

2 - **Instale as dependências**
    ```bash
    npm install
    ```

3 - **Instalar bibliotecas específicas**
```bash
# React Leaflet e Leaflet: Para criar o mapa interativo:
npm install react-leaflet leaflet
```
```bash
React Router: Para navegação entre páginas:
npm install react-router-dom
```
4 - **Instalar o react-range** 

Caso ainda não esteja listado no package.json, você pode instalar executando:
```bash
npm install react-range
```
 **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

 **O projeto estará acessível no navegador, normalmente em:**

 ```bash
http://localhost:3000
 ```


<br>
**ESTRUTURA DAS PASTAS:**

<span style="color: #4A90E2;">*/public*</span>: Contém as imagens usadas no projeto. 
	- marcadorVerde.svg 


<span style="color: #32CD32;">*/src*</span> Contém o código-fonte do projeto.


<span style="color: #90EE90;">*/componentes*</span>: Pasta destinada aos componentes.
	- MapComponent.tsx

<span style="color: #4A90E2;">*App.tsx:*</span>: Arquivo principal.

<span style="color: #4A90E2;">*index.css:*</span>: Configuração do Tailwind. 

<span style="color: #4A90E2;">*tailwind.config.js:*</span>: Arquivo de configuração do Tailwind CSS

---






