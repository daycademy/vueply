import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';

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

io.on('connection', (socket: any) => {
  // tslint:disable-next-line:no-console
  console.log('a user connected');
});

const server = httpServer.listen(app.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at ${app.get('port')}`);
});
