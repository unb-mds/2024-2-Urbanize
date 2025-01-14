import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Urbanize',
    version: '1.0.0',
    description: "<h2>Dados de Projetos de Investimentos - Urbanize</h2>\n\n<p>A prestação de dados como um serviço governamental traz vantagens para toda a sociedade, incluindo o próprio governo.</p>\n\n<p>O governo está comprometido em promover a transparência dos gastos públicos, fornecer informações de valor agregado à sociedade e promover a pesquisa e inovação tecnológica através da implementação da política brasileira de dados abertos.</p>\n\n<h2>Como utilizar a API</h2>\n\n<p>Os serviços disponibilizados são públicos. O acesso aos dados é feito através de URLs, e o retorno é em recursos web no formato JSON. Em cada consulta é possível especificar uma série de parâmetros de filtro, que devem compor a URL. Para acessar os dados da API é necessário conhecer o endereço ou URL\n\n<p>O método indica que será uma requisição GET paginada, sendo na página 0 e de tamanho 10. Consulte nossa documentação para saber quais são os métodos disponíveis. Na documentação, os campos estão listados em ordem alfabética para facilitar a consulta. O parâmetro idUnico é utilizado para filtrar os registros retornados pelo método. Alguns exemplos de consultas:</p>\n\n<p>Todas as consultas acima podem retornar dados no formato JSON.</p>\n\n",
    contact: {
      name: 'Dev Gabriel Lima',
      email: 'gabriel58221@gmail.com',
    },
  },
  servers: [
    {
      url: '',
      description: 'Ambiente de teste',
    },
    {
      url: 'https://two024-2-urbanize.onrender.com',
      description: 'Ambiente de produção',
    },
  ],
  "tags": [
    {
        "name": "Projeto De Investimento",
        "description": "Projetos de Investimento em Infraestrutura"
    }
  ],
}

export const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
}