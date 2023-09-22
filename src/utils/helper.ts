/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
import { createHash } from 'crypto';

export function hash(obj: any) {
  if (typeof obj !== 'string') {
    obj = `${JSON.stringify(obj)}`;
  }
  let hashed = 0;
  for (let i = 0; i < obj.length; i += 1) {
    const char = obj.charCodeAt(i);
    hashed = (hashed << 5) - hashed + char;
    hashed = hashed & hashed; // Convert to 32bit integer
  }
  return Math.abs(hashed);
}

export const digest = (str = '', length = 6) => {
  const digestResult = createHash('sha1').update(str).digest('hex');
  return digestResult.slice(0, length);
};
