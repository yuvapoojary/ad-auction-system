const delay = parseInt(process.env.DELAY_MS, 10);
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export default async function (req, res) {
  await wait(delay);
  return res.json({
    bidder_id: process.env.BIDDER_ID,
    bid_value: parseInt(process.env.BID_VALUE),
  });
}
