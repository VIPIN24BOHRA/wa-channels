/* eslint-disable consistent-return */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';

import type { QueuedChannel } from '@/lib/modules/firebase.types';
import FirebaseClient from '@/lib/modules/firebaseClient';
import { digest } from '@/utils/helper';

import { ChannelCard } from '../channelCard/channelCard';
import { Skeleton } from '../ui/skeleton';

export default function AllChannelWrapper() {
  const [allChannels, setAllChannels] = useState<QueuedChannel[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const uid = FirebaseClient.auth().currentUser?.uid;
    if (!uid) return;
    FirebaseClient.database()
      .ref(`/app/createChannelQueue`)
      .orderByChild('uid')
      .equalTo(uid)
      .on('value', (snap: FirebaseClient.database.DataSnapshot) => {
        console.log(snap, snap.exists());
        if (snap && snap.exists()) {
          console.log(snap.val());
          setAllChannels(Object.values(snap.val()));
        } else {
          setAllChannels([]);
        }
        setLoading(false);
      });
    return () => {
      FirebaseClient.database()
        .ref(`/app/createChannelQueue`)
        .orderByChild('uid')
        .equalTo(uid)
        .off();
    };
  }, []);
  if (loading)
    return (
      <section className="flex h-[500px] w-full flex-wrap items-start overflow-auto px-8 pt-24 ">
        <div className="flex w-full items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="w-[90%] space-y-2">
            <Skeleton className="h-8 w-[100%]" />
            <Skeleton className="h-48 w-[100%]" />
          </div>
        </div>
      </section>
    );
  if (allChannels.length)
    return (
      <section className="flex h-[500px] w-full flex-wrap items-start overflow-auto px-8 pt-24 ">
        {allChannels.map((c) => {
          return (
            <ChannelCard
              key={`${digest(c.channelName + c.channelDescription)}`}
              channelDetails={c}
            />
          );
        })}
      </section>
    );
  return (
    <section className="flex h-[500px] items-center justify-center overflow-auto ">
      <div>
        You don't have any whatsapp channel, click on create channel and start
        auto posting to your channel{' '}
      </div>
    </section>
  );
}
