import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export default async function Cors(
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  await NextCors(Request, Response, {
    // Options
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
}
