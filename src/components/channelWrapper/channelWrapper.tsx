/* eslint-disable  consistent-return */
/* eslint-disable  react/no-unescaped-entities */
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import type { Post, QueuedChannel } from '@/lib/modules/firebase.types';
import FirebaseClient from '@/lib/modules/firebaseClient';
import { digest } from '@/utils/helper';

import { CreatePost } from '../createPost/createPost';
import { PostCard } from '../postCard/postCard';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '../ui/use-toast';

export default function ChannelWrapper({
  channelDetails,
  setSelectedChannel,
}: {
  channelDetails: QueuedChannel;
  setSelectedChannel: Dispatch<SetStateAction<QueuedChannel | null>>;
}) {
  const { toast } = useToast();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [createPost, showCreatePost] = useState(false);

  useEffect(() => {
    const uid = FirebaseClient.auth().currentUser?.uid;
    if (!uid) return;
    FirebaseClient.database()
      .ref(`/app/posts`)
      .orderByChild('channelId')
      .equalTo(channelDetails.channelId)
      .on('value', (snap: FirebaseClient.database.DataSnapshot) => {
        console.log(snap, snap.exists());
        if (snap && snap.exists()) {
          console.log(snap.val());
          setAllPosts(Object.values(snap.val()));
        } else {
          setAllPosts([]);
        }
        setLoading(false);
      });
    return () => {
      FirebaseClient.database()
        .ref(`/app/posts`)
        .orderByChild('channelId')
        .equalTo(channelDetails.channelId)
        .off();

      console.log('post has been unsubscribed');
    };
  }, []);

  return (
    <section className="flex h-[500px] w-full overflow-auto px-8 pt-24 ">
      <svg
        height="512px"
        viewBox="0 0 512 512"
        width="512px"
        className="mb-4 -ml-4 h-[32px] w-[32px] cursor-pointer hover:bg-[#eee]"
        onClick={() => {
          setSelectedChannel(null);
        }}
      >
        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />
      </svg>
      <div className="ml-4 w-[95%]">
        <div className="flex items-center">
          <div className="grow">
            <h3 className="text-2xl font-semibold">
              {channelDetails.channelName}
            </h3>
            <p className="text-sm text-[#444]">
              Created At: {new Date(channelDetails.createdat).toDateString()}
            </p>
          </div>
          <Button
            onClick={() => {
              if (channelDetails.status === 'created') showCreatePost(true);
              else
                toast({
                  title: 'Warning!',
                  description: `channel is in ${channelDetails.status} state, please wait for some time.`,
                  className: 'bg-[#efe]',
                });
            }}
          >
            + Post
          </Button>
        </div>

        <p className="mt-4 text-sm">{channelDetails.channelDescription}</p>
        <h3 className="mt-8 font-semibold">All Posts:</h3>
        <section className="flex flex-wrap items-start overflow-auto pt-8 ">
          {!allPosts.length && !loading && (
            <div className="mt-4 flex w-full justify-center text-center text-[#aaa]">
              You don't have any post in this channel, click on post button to
              continue.
            </div>
          )}
          {allPosts.map((p) => {
            return <PostCard key={digest(p.postMessage)} postDetails={p} />;
          })}
          {loading && (
            <div className="flex w-full items-start space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="w-[90%] space-y-2">
                <Skeleton className="h-8 w-[100%]" />
                <Skeleton className="h-48 w-[100%]" />
              </div>
            </div>
          )}
        </section>
      </div>
      {createPost && (
        <CreatePost
          showCreatePost={showCreatePost}
          channelId={channelDetails.channelId}
          channelName={channelDetails.channelName}
        />
      )}
    </section>
  );
}
