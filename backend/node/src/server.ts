import { options } from './utils/swaggerConfig.js'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { errorHandling } from './middlewares/error-handling'
import { router } from './routes/routes'
import { CronJob } from 'cron'
import { fetchAndSaveProjects } from './database/fetchAPI'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()
const swaggerSpec = swaggerJSDoc(options)

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandling)

// docs middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// inicializando o cron job para coleta de dados
new CronJob( 
  '0 * * * *', // atualiza a cada 1 hora
  async () => { 
    await fetchAndSaveProjects() 
  }, 
  null, 
  true, 
  'America/Sao_Paulo' // fuso do Brasil
) 

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
