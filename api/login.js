// api/login.js — Scentra Members Portal
// Vercel Serverless Function
// Credentials live ONLY in Vercel Environment Variables — never in source code

module.exports = function handler(req, res) {
  // CORS + preflight support (safe for browser calls from your own domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Vercel may provide req.body as object/string/undefined depending on caller
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
    }
  }
  payload = payload || {};

  const email = String(payload.email || '').trim();
  const password = String(payload.password || '');
  const code = String(payload.code || '').trim();

  // Basic input check
  if (!email || !password || !code) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Members list — values come from Vercel Environment Variables
  // These are NEVER visible in your source code or GitHub
  const members = [
    {
      email: process.env.MEMBER_1_EMAIL,
      password: process.env.MEMBER_1_PASSWORD,
      code: process.env.MEMBER_1_CODE,
      name: 'Priyasha Dutta',
      role: 'Founder & Admin',
      memberId: process.env.MEMBER_1_CODE,
    },
    {
      email: process.env.MEMBER_2_EMAIL,
      password: process.env.MEMBER_2_PASSWORD,
      code: process.env.MEMBER_2_CODE,
      name: 'Lead Developer',
      role: 'Developer — Full Stack',
      memberId: process.env.MEMBER_2_CODE,
    },
  ].filter(m => m.email && m.password && m.code);

  if (!members.length) {
    return res.status(500).json({
      success: false,
      message: 'Login is not configured on production. Add MEMBER_* environment variables in Vercel.',
    });
  }

  // Match credentials (case-insensitive email)
  const matched = members.find(m =>
    m.email.toLowerCase() === email.toLowerCase() &&
    m.password === password &&
    m.code === code.toUpperCase()
  );

  if (!matched) {
    // Tell frontend whether email exists (for friendly error messages)
    // but never reveal what was wrong in detail
    const emailExists = members.some(m => m.email.toLowerCase() === email.toLowerCase());

    return res.status(401).json({
      success: false,
      emailExists, // true = wrong password/code, false = unknown email
    });
  }

  // Send back ONLY safe user info — password and code are NEVER returned
  return res.status(200).json({
    success: true,
    user: {
      name: matched.name,
      role: matched.role,
      memberId: matched.memberId,
      email: matched.email,
    },
  });
};
