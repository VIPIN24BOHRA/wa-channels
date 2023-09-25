import type { NextApiRequest, NextApiResponse } from 'next';

import { saveEmail } from '@/lib/modules/firebase/userDb';

const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;

    if (!email || !email.match(emailRegEx)) {
      res.status(400).send({
        success: false,
        info: 'Oops! Invalid email. Please try again.',
      });
      return;
    }

    await saveEmail(email);
    // return response from here;
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') await handlePostRequest(req, res);
  else res.status(400).send('Invalid request method');
};

export default handler;
