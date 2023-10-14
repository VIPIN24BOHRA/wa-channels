import type { NextApiRequest, NextApiResponse } from 'next';

import type { Post } from '@/lib/modules/firebase.types';
import { createNewPost } from '@/lib/modules/firebase/postDb';
import { fetchUserFromToken } from '@/utils/authHelper';

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { postMessage, channelId, token, channelName } = req.body;

    if (!token) {
      res.status(401).send({
        success: false,
        info: 'Oops! Unauthorized user',
      });
      return;
    }

    if (!channelName || !postMessage || !channelId) {
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
    const newPost: Post = {
      channelName,
      postMessage,
      uid: user.user_id,
      channelId,
      createdat: Date.now(),
      updatedat: 0,
      status: 'queued',
    };
    await createNewPost(newPost);

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
