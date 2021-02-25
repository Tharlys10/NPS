import 'reflect-metadata';
import express from 'express';
import createConnection from './database';
import { router } from './routes';

// create connection database
createConnection();

const app = express();

// Definition format json
app.use(express.json());

// routes
app.use(router);

export { app };