import { Router } from 'express';
import axios from 'axios';
import requestBid from './requestBid.js';

const router = Router();
const bidders = [];
const isTie = (array) => {
  if (array[0].price === array[1].price && array[0].at === array[1].at) {
    return true;
  }
  return false;
};

/**
 * method: post
 * path: /bid
 * body: (auction_id)
 * why auction_id ?
 */
router.post('/bid', async (req, res) => {
  const validBidders = {};
  const bids = await Promise.all(bidders.map(requestBid));
  const sorted = bids.filter(Boolean).sort((a, b) => {
    if (a.price === b.price) {
      return a.at - b.at;
    } else {
      return b.price - a.price;
    }
  });
  if (!sorted[0])
    return res.status(400).json({
      message: 'No bidders bidded within 200ms',
    });
  if (isTie(sorted))
    return res.status(400).json({
      message: `Tie between ${sorted[0].bidder_id} and ${sorted[1].bidder_id}`,
    });
  res.json({
    bidder_id: sorted[0].bidder_id,
    price: sorted[0].price,
  });
});

/**
 * method: get
 * path: /registrations
 */
router.get('/registrations', (req, res) => {
  const endpoints = bidders.map((bidder) => bidder.endpoint);
  return res.json(endpoints);
});

/**
 * method: post
 * path: /registrations
 * body: (id, endpoint?)
 */
router.post('/registrations', async (req, res) => {
  bidders.push({
    id: req.body.id,
    endpoint: req.body.endpoint,
  });
  return res.sendStatus(200);
});

export default router;
