import admin from 'firebase-admin';

import { removeNullKeys } from './firebase';
import type { Post } from './firebase.types';

export const createNewPost = async (postDetails: Post) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/posts/`);
  try {
    const newRef = eventsRef.push();
    await newRef.set(removeNullKeys(postDetails));
    console.log('new post has been queued', newRef.key);
  } catch (error) {
    console.log(error, 'Error while creating new post ');
  }
};

export const getPosts = async () => {
  const db = admin.database();
  const eventsRef = db.ref(`app/posts/`);
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

export const updatePostStatus = async (postDetails: Post, key: string) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/posts/${key}`);
  try {
    await eventsRef.set(removeNullKeys(postDetails));
    console.log('channel status updated');
  } catch (error) {
    console.log(error, 'Error while created channel queued');
  }
};
