import express from 'express';
import cors from 'cors';
import 'express-async-errors'
import { errorHandling } from './middlewares/error-handling';
import { router } from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router)
app.use(errorHandling);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});