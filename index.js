import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookies from 'cookie-parser';

import Routes from './server/route.js';
import Connection from './database/db.js';

const app = express();

app.use(cookies());


dotenv.config();

// To handle HTTP POST requests in Express.js version 4 and above, 
// you need to install the middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/', Routes);



const PORT = '8080';

Connection();
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));