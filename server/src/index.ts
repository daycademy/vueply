import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at ${app.get('port')}`);
});
