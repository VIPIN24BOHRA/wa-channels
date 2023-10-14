import admin from 'firebase-admin';

// import { digest } from '@/utils/helper';
import { removeNullKeys } from './firebase';
import type { QueuedChannel } from './firebase.types';

export const queueCreateChannel = async () => {
  const db = admin.database();
  const eventsRef = db.ref(`app/createChannelQueue/`);
  try {
    const newRef = eventsRef.push();
    // await newRef.set(removeNullKeys(channelDetails));
    console.log('channel queued', newRef.key);
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
};

export const getQueueCreateChannel = async () => {
  const db = admin.database();
  const eventsRef = db.ref(`app/createChannelQueue/`);
  try {
    const snap = await eventsRef
      .orderByChild('status')
      .equalTo('queued')
      .limitToLast(10)
      .once('value');
    if (snap.exists()) {
      return snap.val();
    }
    // await newRef.set(removeNullKeys(channelDetails));
    console.log('fetch channel queued');
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
  return {};
};

export const updateCreateChannelStatus = async (
  channelDetails: QueuedChannel,
  key: string
) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/createChannelQueue/${key}`);
  try {
    await eventsRef.set(removeNullKeys(channelDetails));
    console.log('channel status updated');
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
};
