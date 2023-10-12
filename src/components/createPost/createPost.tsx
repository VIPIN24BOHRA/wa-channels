import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import FirebaseClient from '@/lib/modules/firebaseClient';

import { Textarea } from '../ui/textarea';

export function CreatePost({
  showCreatePost,
  channelId,
}: {
  showCreatePost: Dispatch<SetStateAction<boolean>>;
  channelId: string;
}) {
  const [postMessage, setPostMessage] = useState('');
  const { toast } = useToast();

  const handleCreatePost = async () => {
    const token = await FirebaseClient.auth().currentUser?.getIdToken();
    if (!token) return;

    const data = { channelId, postMessage, token };

    try {
      const res = await fetch('/api/createPost/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
      if (response.success) {
        setPostMessage('');
        toast({
          title: 'Success!!',
          description: 'new post      successfully queued',
          className: 'bg-[#eee]',
        });
        showCreatePost(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[10] flex h-screen w-full items-center justify-center bg-[#0005] backdrop-blur-[3px]">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Create Post in one click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Post message</Label>
                <Textarea
                  placeholder="Enter message..."
                  id="description"
                  value={postMessage}
                  onChange={(e) => {
                    setPostMessage(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              showCreatePost(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={handleCreatePost}>Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
