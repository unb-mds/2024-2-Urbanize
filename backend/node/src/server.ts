import express from 'express';
import cors from 'cors';
import 'express-async-errors'
import { errorHandling } from './middlewares/error-handling';
import { router } from './routes/routes';
import { CronJob } from 'cron';
import { fetchAndSaveProjects } from './database/fetchAPI';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router)
app.use(errorHandling);

// inicializando o cron job para coleta de dados
new CronJob( 
  '1 * * * * *', 
  async () => { 
    await fetchAndSaveProjects(); 
  }, 
  null, 
  true, 
  'America/Sao_Paulo' // fuso do Brasil
); 

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});