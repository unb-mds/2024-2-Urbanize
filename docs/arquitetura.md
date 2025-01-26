

Pré-requisitos
NodeJS v20 ou superior
Python 3.12.3

Clone o repositório do projeto:

```bash
git clone https://github.com/unb-mds/2024-2-Urbanize.git]
```




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


## Funcionamento do Cron Job

O Cron Job já está configurado no projeto para executar periodicamente o script de requisição de dados. Ele está integrado ao sistema, eliminando a necessidade de configurações adicionais. O script responsável por esta automação está localizado em:

```plaintext
<diretorio-do-projeto>/scripts/update_data.py
```

Por padrão, o Cron Job é executado a cada 24 horas para assegurar que as informações estejam sempre atualizadas. Caso seja necessário verificar ou ajustar a frequência, a alteração dos marcadores pode ser feito diretamente no código do projeto.


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



