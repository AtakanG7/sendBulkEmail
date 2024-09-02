import express, { json, urlencoded } from 'express';
import bodyParser from 'body-parser';
import emailRouter from './routes/email.js';
import { swaggerSpec, swaggerUi } from './swagger.js';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(path.dirname(import.meta.url), 'views'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', emailRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
