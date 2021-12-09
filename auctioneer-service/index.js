import express from 'express';
import routes from './routes.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);

app.use((req, res) => {
  return res.status(404).json({
    status: 400,
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Auctioneer service is listening on port ${port}`);
});

export default app;
