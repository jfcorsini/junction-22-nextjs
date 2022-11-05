// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/db';
import { DataRequest, validateDataRequest } from '../../utils/validator';

type Response = { error: string} | { message: string}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    return res.status(500).json({ error: "Only POST requests allowed" });
  }

  let body: DataRequest;
  try {
    body = validateDataRequest(req.body);
  } catch (error) {
    console.error(error, 'Failed to validate request body');
    return res.status(500).json({ error: "Wrong data format" });
  }

  await supabase.from(body.model).upsert({
    timestamp: new Date(body.timestamp).toISOString(),
    value: body.value
  });

  res.status(200).json({ message: "Success" });
}
