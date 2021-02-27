import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

// create connection database
createConnection();

const app = express();

// Definition format json
app.use(express.json());

// routes
app.use(router);

// errors
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  return response.status(500).json({
    message: 'Internal server error',
    detail: err
  });
});

export { app };