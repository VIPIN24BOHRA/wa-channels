import admin from 'firebase-admin';

import type { Post } from '../firebase.types';
// import { digest } from '@/utils/helper';
import { removeNullKeys } from './firebase';

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
