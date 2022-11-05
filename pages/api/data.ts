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
  const timestamp = new Date().toISOString()

  if (!body.value.length) {
    return res.status(200).json({ message: "Empty values" });
  }

  if (body.model === "sleep") {
    await supabase.from("sleep").insert({
      timestamp,
      value: body.value
    });
  } else if (body.model === "pulse") {
    // TODO: Calculate HRV & HR from array
    const hrv = body.value[0];
    const hr = body.value[0];

    await supabase.from("hrv").insert({
      timestamp,
      value: hrv
    });

    await supabase.from("hr").insert({
      timestamp,
      value: hr
    });
  } else {
    return res.status(500).json({ message: "Unexpected body model" });
  }


  res.status(200).json({ message: "Success" });
}
