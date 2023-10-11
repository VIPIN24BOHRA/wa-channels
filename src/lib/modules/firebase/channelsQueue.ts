import admin from 'firebase-admin';

import type { QueuedChannel } from '../firebase.types';
// import { digest } from '@/utils/helper';
import { removeNullKeys } from './firebase';

export const queueCreateChannel = async (channelDetails: QueuedChannel) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/createChannelQueue/`);
  try {
    const ref = eventsRef.push(removeNullKeys(channelDetails));
    console.log('channel queued', ref.key);
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
};
