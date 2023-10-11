import type { NextApiRequest, NextApiResponse } from 'next';

import type { QueuedChannel } from '@/lib/modules/firebase.types';
import { queueCreateChannel } from '@/lib/modules/firebase/channelsQueue';
import { fetchUserFromToken } from '@/utils/authHelper';

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { channelName, channelDescription, token } = req.body;

    if (!token) {
      res.status(401).send({
        success: false,
        info: 'Oops! Unauthorized user',
      });
      return;
    }

    if (!channelName || !channelDescription) {
      res.status(400).send({
        success: false,
        info: 'Oops! missing channel details. Please try again.',
      });
      return;
    }

    const user = await fetchUserFromToken(token);

    if (!user || !user.user_id) {
      res.status(401).send({
        success: false,
        info: 'Oops! The UnAuthorized User. Please login and try again.',
      });
      return;
    }

    const channelDetails: QueuedChannel = {
      channelName,
      channelDescription,
      createdat: Date.now(),
      updatedat: 0,
      uid: user.user_id,
      status: 'queued',
    };
    console.log(channelDescription);

    await queueCreateChannel(channelDetails);
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
