import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from '../../middleware/Cors';
import { ApiVtex } from '../../service/api';

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  await Cors(Request, Response);

  try {
    const response = await ApiVtex.get('/search');

    const { data } = response;

    return Response.status(200).json(data);
  } catch (err) {
    return Response.status(500).send('Internal server error!');
  }
}
