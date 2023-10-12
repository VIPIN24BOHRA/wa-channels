import type { Dispatch, SetStateAction } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { QueuedChannel } from '@/lib/modules/firebase.types';

export function ChannelCard({
  channelDetails,
  setSelectedChannel,
}: {
  channelDetails: QueuedChannel;
  setSelectedChannel: Dispatch<SetStateAction<QueuedChannel | null>>;
}) {
  return (
    <Card
      className="relative mr-8 mb-4 h-[300px] max-h-[300px] w-[330px] cursor-pointer overflow-hidden shadow-md"
      onClick={() => {
        setSelectedChannel(channelDetails);
      }}
    >
      <CardHeader className="mt-2">
        <CardTitle>{channelDetails.channelName}</CardTitle>
        <CardDescription>
          Created at : {new Date(channelDetails.createdat).toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {channelDetails.channelDescription}
      </CardContent>
      {channelDetails.status !== 'created' && (
        <p className="absolute top-2 right-2 flex items-center">
          <span className="relative mr-2 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#000] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#000]"></span>
          </span>
          <span className="text-sm font-semibold">{channelDetails.status}</span>
        </p>
      )}
    </Card>
  );
}
