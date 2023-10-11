import admin from 'firebase-admin';

import type { QueuedChannel } from '../firebase.types';
// import { digest } from '@/utils/helper';
import { removeNullKeys } from './firebase';

export const queueCreateChannel = async (channelDetails: QueuedChannel) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/createChannelQueue/`);
  try {
    const newRef = eventsRef.push();
    await newRef.set(removeNullKeys(channelDetails));
    console.log('channel queued', newRef.key);
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
};
