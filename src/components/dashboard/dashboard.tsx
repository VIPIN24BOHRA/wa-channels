/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';

import { CardWithForm } from '../createChannel/createChannel';
import { Button } from '../ui/button';

export default function DashboardPage() {
  const [createChannelModel, showCreateChannelModal] = useState(false);
  return (
    <div className="mx-4 mt-8">
      <h3 className="text-xl font-bold ">Home</h3>

      <div className="mt-4 h-[600px] w-full rounded-md border-[2px] border-[#eee] shadow-lg">
        <nav className="border-b-[2px] border-[#eee] p-4">
          <ul className="flex items-center">
            <div className="grow ">
              <li className="font-bold">All Channel</li>
            </div>
            <Button
              onClick={() => {
                showCreateChannelModal(true);
              }}
            >
              + Create new channel
            </Button>
          </ul>
        </nav>
        <section className="flex h-full items-center justify-center ">
          <div>
            You don't have any whatsapp channel, click on create channel and
            start auto posting to your channel{' '}
          </div>
        </section>
      </div>
      {createChannelModel && (
        <CardWithForm showCreateChannelModal={showCreateChannelModal} />
      )}
    </div>
  );
}
