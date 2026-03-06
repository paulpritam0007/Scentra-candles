module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, code } = req.body || {};

  const MEMBERS = [
    {
      email:    process.env.MEMBER_1_EMAIL,
      password: process.env.MEMBER_1_PASSWORD,
      code:     process.env.MEMBER_1_CODE,
      name:     'Priyasha Dutta',
      role:     'Founder & Admin',
    },
    {
      email:    process.env.MEMBER_2_EMAIL,
      password: process.env.MEMBER_2_PASSWORD,
      code:     process.env.MEMBER_2_CODE,
      name:     'Pritam Paul',
      role:     'Developer — Full Stack',
    },
  ];

  const match = MEMBERS.find(
    m => m.email && m.email.toLowerCase() === (email || '').toLowerCase()
  );

  if (!match) {
    return res.status(200).json({ success: false, emailExists: false });
  }

  if (match.password !== password || match.code !== (code || '').toUpperCase()) {
    return res.status(200).json({ success: false, emailExists: true });
  }

  return res.status(200).json({
    success: true,
    user: { email: match.email, name: match.name, role: match.role },
  });
};
