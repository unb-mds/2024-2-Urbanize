import express from 'express';
import cors from 'cors';
import 'express-async-errors'
import { errorHandling } from './infrastructure/middlewares/error-handling';

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandling);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});