import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Api from '../../service/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await Api.get('/search/blusa');
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).send('Internal server error!');
  }
}
