import { NextApiRequest, NextApiResponse } from 'next';
import { checkDatabaseTables } from '@/lib/check-tables';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await checkDatabaseTables();
    res.status(200).json({ message: 'Check completed, see server logs' });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to check tables' });
  }
} 