/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable  no-restricted-syntax */
import admin from 'firebase-admin';
import { getApp, initializeApp } from 'firebase-admin/app';

const createFirebaseApp = () => {
  try {
    return getApp();
  } catch (e) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    return initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
};

export function sanitizePath(path: string) {
  const sanitizedPath = path.replace(/[.#$[\]]/g, '-');
  return sanitizedPath;
}

export function removeNullKeys(obj: any) {
  const newObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value || value === '' || value === 0) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          newObj[key] = removeNullKeys(value);
        } else {
          newObj[key] = value;
        }
      }
    }
  }
  return newObj;
}

createFirebaseApp();
