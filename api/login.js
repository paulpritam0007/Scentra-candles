// api/login.js — Scentra Members Portal
// Vercel Serverless Function
// Credentials live ONLY in Vercel Environment Variables — never in source code

module.exports = function handler(req, res) {

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, password, code } = req.body;

  // Basic input check
  if (!email || !password || !code) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Members list — values come from Vercel Environment Variables
  // These are NEVER visible in your source code or GitHub
  const MEMBERS = [
    {
      email:    process.env.MEMBER_1_EMAIL,
      password: process.env.MEMBER_1_PASSWORD,
      code:     process.env.MEMBER_1_CODE,
      name:     'Priyasha Dutta',
      role:     'Founder & Admin',
      memberId: process.env.MEMBER_1_CODE,
    },
    {
      email:    process.env.MEMBER_2_EMAIL,
      password: process.env.MEMBER_2_PASSWORD,
      code:     process.env.MEMBER_2_CODE,
      name:     'Lead Developer',
      role:     'Developer — Full Stack',
      memberId: process.env.MEMBER_2_CODE,
    },
  ];

  // Match credentials (case-insensitive email)
  const matched = MEMBERS.find(m =>
    m.email &&
    m.email.toLowerCase() === email.toLowerCase() &&
    m.password === password &&
    m.code === code.toUpperCase()
  );

  if (!matched) {
    // Tell frontend whether email exists (for friendly error messages)
    // but never reveal what was wrong in detail
    const emailExists = MEMBERS.some(m =>
      m.email && m.email.toLowerCase() === email.toLowerCase()
    );
    return res.status(401).json({
      success: false,
      emailExists, // true = wrong password/code, false = unknown email
    });
  }

  // Send back ONLY safe user info — password and code are NEVER returned
  return res.status(200).json({
    success: true,
    user: {
      name:     matched.name,
      role:     matched.role,
      memberId: matched.memberId,
      email:    matched.email,
    },
  });
}
