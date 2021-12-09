import express from 'express';
import axios from 'axios';
import handler from './bidRequestHandler.js';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get('/', handler);

async function registerToAuction() {
  await axios.post(process.env.AUCTIONEER_URL, {
    id: process.env.BIDDER_ID,
    endpoint: `http://${process.env.BIDDER_ID}:${process.env.PORT}/`,
  });
  console.log(`${process.env.BIDDER_ID} registered for the auction`);
}

async function start() {
  await registerToAuction();
  app.listen(process.env.PORT);
}

start();

export default app;
