/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { delay } from '../../utils/helper';
import {
  getQueueCreateChannel,
  updateCreateChannelStatus,
} from '../firebase/channelsQueue';
import type { Post, QueuedChannel } from '../firebase/firebase.types';
import { getPosts, updatePostStatus } from '../firebase/postDb';

export const createChannelCron = (bot: any) => {
  setInterval(async () => {
    const queuedChannel = (await getQueueCreateChannel()) ?? {};

    const keysArr: string[] = Object.keys(queuedChannel);

    for (let i = 0; i < keysArr.length; i++) {
      const channelDetails = queuedChannel[keysArr[i] ?? ''] as QueuedChannel;
      console.log('processing channel', channelDetails);
      try {
        await bot.createChannel(channelDetails);
        await updateCreateChannelStatus(
          {
            ...channelDetails,
            status: 'created',
          },
          keysArr[i] ?? ''
        );
        await delay(1000);
      } catch (err) {
        console.log(err);
        await updateCreateChannelStatus(
          {
            ...channelDetails,
            status: 'failed',
          },
          keysArr[i] ?? ''
        );
      }
    }
    await sentMessageCron(bot);
  }, 2 * 60 * 1000);
};

export const sentMessageCron = async (bot: any) => {
  const queuedPosts = (await getPosts()) ?? {};

  const keysArr = Object.keys(queuedPosts);
  for (let i = 0; i < keysArr.length; i++) {
    const postDetails = queuedPosts[keysArr[i] ?? ''] as Post;
    console.log('processing post', postDetails);
    try {
      await bot.sendMessage(postDetails.channelName, postDetails.postMessage);
      await updatePostStatus(
        {
          ...postDetails,
          status: 'created',
        },
        keysArr[i] ?? ''
      );
      await delay(1000);
    } catch (err) {
      console.log(err);
      await updatePostStatus(
        {
          ...postDetails,
          status: 'failed',
        },
        keysArr[i] ?? ''
      );
    }
  }
};
