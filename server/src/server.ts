import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();

// Definition format json
app.use(express.json());

// routes
app.use(router);

// use definition port
const port = process.env.PORT || 3333;

// init server
app.listen(port, () => console.log(`🚀 Server is running! - 🛂 :${port}`));