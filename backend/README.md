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
- Npm

### 📲 Instalação

Após configurar o [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/), em um diretório de sua máquina, abra o terminal e execute:

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git
```

Com o repositório do backend devidamente clonado, você terá acesso à aplicação **Express**:

#### **Express/API**

Navegue até o diretório raiz do repositório clonado:

```bash
cd 2024-2-Urbanize
```
Em seguida instale as dependências do Urbanize:

```bash
npm install
```

### ⚙️ Execução

#### **Express/API**

Para executar a aplicação Express em sua máquina, execute no diretório raiz:

```bash
npm run dev
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

## 🛠️ Guia de contribuição

**Para acessar o guia completo de contribuição**: [**Guia de Contribuição**](https://unb-mds.github.io/2024-2-Urbanize/)

---

## 📒 Documentação e muito mais!

**Para acessar a documentação completa**: [**Documentação Urbanize**](https://unb-mds.github.io/2024-2-Urbanize/)
