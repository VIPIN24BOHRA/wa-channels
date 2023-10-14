export interface QueuedChannel {
  channelName: string;
  channelDescription?: string;
  uid: string;
  createdat: number;
  updatedat: number;
  status: 'queued' | 'created' | 'failed';
  channelId: string;
}

export interface Post {
  postMessage: string;
  channelId: string;
  channelName: string;
  uid: string;
  status: 'queued' | 'created' | 'failed';
  createdat: number;
  updatedat: number;
}
