import type { NextApiRequest, NextApiResponse } from 'next';

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;
    console.log(email);

    res.status(200).send('hello server up and running');
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') await handleGetRequest(req, res);
  else res.status(400).send('Invalid request method');
};

export default handler;
