import axios from 'axios';

export default async function ({ endpoint }) {
  const before = Date.now();
  const { data } = await axios.get(endpoint);
  const diff = Date.now() - before;
  if (diff > 200) return null;

  return {
    at: before,
    bidder_id: data.bidder_id,
    price: data.bid_value,
  };
}
