# [Urbanize](#)

---

Para melhor divisão e organização, o Urbanize está dividido em dois repositórios.

Você está no **Backend**:

---

O [Urbanize](#) é um projeto desenvolvido na disciplina Métodos de Desenvolvimento de Software (MDS) ofertada no curso de Engenharia de Software na Universidade de Brasília (UnB), que visa reunir em um único local dados sobre obras publicas, utilizando informações extraídas da pesquisa educacional realizada pelo ObrasGov. A plataforma permite diferentes interpretações dos dados e progresso das obras.

O projeto é um software livre e está sob a licença [MIT](./LICENSE).

---

## 🗒️ Sumário

- [Urbanize](#urbanize)
  - [🗒️ Sumário](#️-sumário)
  - [🏁 Início](#-início)
    - [🏞️ Ambiente e Pré-requisitos](#️-ambiente-e-pré-requisitos)
    - [📲 Instalação](#-instalação)
      - [**Express/API**](#expressapi)
      - [**Scraper**](#scraper)
    - [⚙️ Execução](#️-execução)
      - [**Express/API**](#expressapi-1)
      - [**Scraper**](#scraper-1)
      - [**ETL**](#etl)
  - [🛠️ Guia de contribuição](#️-guia-de-contribuição)
  - [📒 Documentação e muito mais!](#-documentação-e-muito-mais)

---

## 🏁 Início

Siga os passos abaixo para executar o **backend** do [**Urbanize**](#):

### 🏞️ Ambiente e Pré-requisitos

Para rodar o projeto é fundamental ter algumas dependências globais:

- Node
- Miniconda/Python

Para visualizar versões, links e as instruções completas de configuração do ambiente: [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/)


### 📲 Instalação

Após configurar o [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/), em um diretório de sua máquina, abra o terminal e execute:

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git
```

Com o repositório do backend devidamente clonado, você terá acesso à aplicação **Express** e ao **Scraper**:

#### **Express/API**

Navegue até o diretório raiz do repositório clonado:

```bash
cd 2024-2-Urbanize
```
Em seguida instale as dependências do Urbanize:

```bash
npm install
```

#### **Scraper**

Navegue até o diretório `WebScrapper`:

```bash
cd WebScrapper
```
Crie um ambiente virtual com conda:

```bash
conda create --name <my-env>
```

Ative o ambiente criado:

```bash
conda activate <my-env>
```

Instale as dependências e bibliotecas dentro do ambiente virtual:

```bash
conda install --yes --file requirements.txt
```

O script ETL acessa o banco de dados por meio de um `.env` encontrado no caminho
`WebScrapper/DataETL/.env`. A sua estrutura está escrita abaixo:

```bash
DATABASE_USERNAME=<INSERIR AQUI>
DATABASE_PASSWORD=<INSERIR AQUI>
DATABASE_NAME=<INSERIR AQUI>
DATABASE_PORT=<INSERIR AQUI>
DATABASE_HOST=<INSERIR AQUI>
```


### ⚙️ Execução

#### **Express/API**

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

#### **Scraper**

Com o ambiente ativado como instruído acima, para extrair os dados do Oracle Data com o selenium execute:

```bash
DataScraper/InepScrapper.py
```

#### **ETL**

Para tratar e carregar os dados extraídos, em modo debugger, acesse `WebScrapper/DataETL`, lembre-se de selecionar o ambiente conda que foi criado, e então para rodar o programa por partes, execute:

```bash
ETLDebugger.ipynb
```

Se preferir, e não precisar/quiser rodar em modo debugger(por partes), execute o código para produção:

```bash
python3 WebSrapper/DataETL/main.py
```

---

## 🛠️ Guia de contribuição

**Para acessar o guia completo de contribuição**: [**Guia de Contribuição**](https://unb-mds.github.io/2024-2-Urbanize/)

---

## 📒 Documentação e muito mais!

**Para acessar a documentação completa**: [**Documentação Urbanize**](https://unb-mds.github.io/2024-2-Urbanize/)

Nela, você encontra os seguintes tópicos:

- [Início](https://unb-mds.github.io/2024-2-Urbanize/)
- [Sprints](https://unb-mds.github.io/2024-2-Urbanize/sprints/sprint-0/)
- [Projeto](https://unb-mds.github.io/2024-2-Urbanize/project/personas/):
    - [Personas](https://unb-mds.github.io/2024-2-Urbanize/project/personas/)
    - [StoryMap](https://unb-mds.github.io/2024-2-Urbanize/project/storymap/)
    - [Requisitos](https://unb-mds.github.io/2024-2-Urbanize/project/requirements/)
    - [EAP](https://unb-mds.github.io/2024-2-Urbanize/project/eap/)
    - [API](https://unb-mds.github.io/2024-2-Urbanize/project/servicos/)
    - [Arquitetura e Tecnologias](https://unb-mds.github.io/2024-2-Urbanize/project/arquitetura/)
    - [Protótipo](https://unb-mds.github.io/2024-2-Urbanize/project/prototipo/)
- [Como contribuir](https://unb-mds.github.io/2024-2-Urbanize/environment/):
    - [Ambiente de desenvolvimento](https://unb-mds.github.io/2024-2-Urbanize/environment/)
    - [Primeiros passos - frotend](https://unb-mds.github.io/2024-2-Urbanize/contributing-frontend/)
    - [Primeiros passos - backend](https://unb-mds.github.io/2024-2-Urbanize/contributing-backend/)
- [Sobre](https://unb-mds.github.io/2024-2-Urbanize/about/)
