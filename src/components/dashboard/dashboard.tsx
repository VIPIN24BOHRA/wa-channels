/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';

import AllChannelWrapper from '../allChannelWrapper/allChannelWrapper';
import { CardWithForm } from '../createChannel/createChannel';
import { Button } from '../ui/button';

export default function DashboardPage() {
  const [createChannelModel, showCreateChannelModal] = useState(false);
  return (
    <div className=" mx-4 my-12">
      <h3 className="text-xl font-bold ">Home</h3>
      <div className="relative mt-8 w-full rounded-md border-[2px] border-[#eee] shadow-lg">
        <nav className="absolute top-0 z-10 w-full border-b-[2px] border-[#eee] bg-[#fff5] px-8 py-4 backdrop-blur-[8px]">
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
        <AllChannelWrapper />
      </div>
      {createChannelModel && (
        <CardWithForm showCreateChannelModal={showCreateChannelModal} />
      )}
    </div>
  );
}
