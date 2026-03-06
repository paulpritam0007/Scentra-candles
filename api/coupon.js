module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;

if (typeof body === "string") {
  body = JSON.parse(body);
}

const { code } = body || {};
  if (!code) return res.status(200).json({ valid: false, message: 'No code provided' });

  // Load coupons from environment variables
  const COUPONS = [
    process.env.COUPON_1,
    process.env.COUPON_2,
    process.env.COUPON_3,
    process.env.COUPON_4,
    process.env.COUPON_5,
  ]
  .filter(Boolean)
  .map(entry => {
    const [couponCode, amount, type] = entry.split(':');
    return { code: couponCode, amount: Number(amount), type };
  });

  const match = COUPONS.find(c => c.code === code.toUpperCase().trim());

  if (!match) {
    return res.status(200).json({ valid: false, message: 'Invalid coupon code' });
  }

  return res.status(200).json({
    valid: true,
    code: match.code,
    amount: match.amount,
    type: match.type, // "percent" or "flat"
    message: match.type === 'percent'
      ? `${match.amount}% off applied!`
      : `₹${match.amount} off applied!`
  });
};
