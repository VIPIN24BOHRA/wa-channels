export interface QueuedChannel {
  channelName: string;
  channelDescription?: string;
  uid: string;
  createdat: number;
  updatedat: number;
  status: 'queued' | 'created' | 'failed';
}
