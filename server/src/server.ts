import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

// use definition port
const port = process.env.PORT || 3333

// routes
app.get('/', (request, response) => {
  response.json({ message: "Hello World - NLW04 🚀" })
})

// init server
app.listen(port, () => console.log(`🚀 Server is running! - 🛂 :${port}`));