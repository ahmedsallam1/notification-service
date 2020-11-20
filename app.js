import express from 'express';
import loaders from './loaders/index';
require('dotenv').config()

async function startServer() {

  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.SERVER_PORT, err => {
    if (err) {
      console.log(err);

      return;
    }
    console.log(`App running at: http://127.0.0.1:${process.env.SERVER_PORT}`);
  });
}

startServer();