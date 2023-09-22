import admin from 'firebase-admin';

import { digest } from '@/utils/helper';

import { removeNullKeys } from './firebase';

export const saveEmail = async (email: string) => {
  const db = admin.database();
  const eventsRef = db.ref(`app/user/${digest(email, 8)}`);
  try {
    await eventsRef.set(removeNullKeys({ email }));
  } catch (error) {
    console.log(error, 'Error while adding Event');
  }
};
