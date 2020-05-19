import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';
import { executeCode } from './pythonExecutor';

const app = express();
const httpServer = new http.Server(app);
const io = socketio(httpServer);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/execute-python', (req, res) => {
  if (!req.body.code) {
    res.status(400).send('Please specify a code body');
    return;
  }
  // tslint:disable-next-line:no-console
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

io.on('connection', (socket: any) => {
  // tslint:disable-next-line:no-console
  console.log('a user connected');
});

const server = httpServer.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at ${app.get('port')}`);
});
