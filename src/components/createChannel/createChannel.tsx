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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import FirebaseClient from '@/lib/modules/firebaseClient';

import { Textarea } from '../ui/textarea';

export function CardWithForm({
  showCreateChannelModal,
}: {
  showCreateChannelModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const { toast } = useToast();

  const handleCreateChannel = async () => {
    const token = await FirebaseClient.auth().currentUser?.getIdToken();
    if (!token) return;

    const data = { channelName, channelDescription, token };

    try {
      const res = await fetch('/api/createChannel/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log(response);
      if (response.success) {
        setChannelDescription('');
        setChannelName('');
        toast({
          title: 'Success!!',
          description: 'channel details successfully queued',
          className: 'bg-[#eee]',
        });
        showCreateChannelModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[10] flex h-screen w-full items-center justify-center bg-[#0005] backdrop-blur-[3px]">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create Channel</CardTitle>
          <CardDescription>
            Create Channel in one click. Enter channel name and description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Channel name</Label>
                <Input
                  id="name"
                  placeholder="Enter channel name"
                  value={channelName}
                  onChange={(e) => {
                    setChannelName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="descriptoin">Channel description</Label>
                <Textarea
                  placeholder="Type channel description here."
                  id="description"
                  value={channelDescription}
                  onChange={(e) => {
                    setChannelDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              showCreateChannelModal(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={handleCreateChannel}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
