'use client';

import Image from 'next/image';
import { useState } from 'react';

import CustomSpinner from '@/components/customSpinner';
import FAQ from '@/components/faq/faq';
import SocialMedia from '@/components/socialMedia/socialMedia';
import TextAnimation from '@/components/textAnimation/textAnimation';

import socialMediaImg from '../../public/assets/images/socialMediaBox.png';
import waChannelImg from '../../public/assets/images/waChannel.png';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<{
    success: boolean;
    info: String;
  } | null>(null);

  const handleSaveEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/saveEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const response = await res.json();

      if (response.success) {
        setEmail('');
        setShowNotification({
          success: true,
          info: 'Email Succesfully Saved!',
        });
      } else {
        setShowNotification(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setTimeout(() => {
      setShowNotification(null);
    }, 5000);
  };

  return (
    <>
      <div className="mt-16 flex min-h-screen w-[100%] flex-col items-center overflow-hidden bg-white px-8 sm:px-16">
        <h1 className="text-center text-5xl font-extrabold">
          Transform your{' '}
          <span className="text-[#017cff]">
            social media into WhatsApp
            <br /> Channel ✨
          </span>
          updates with ease!
        </h1>

        <p className="mt-4 text-center font-[500] text-[#404040]">
          Step up Your Social Media Game: Share Your Posts on the new WhatsApp
          Channel
          <br /> feature with Ease – Stay Connected, Share Content, and Engage!
        </p>

        <h3 className="mt-8 animate-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 bg-clip-text text-center text-2xl font-bold text-transparent">
          Be among the first to experience our beta launch! <br />
          Enter your email below to secure your spot.
        </h3>
        <form className=" relative  w-[400px]">
          <input
            type="url"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={`sm:ml-4  mt-4 block w-full rounded-lg border-2 border-dotted border-headingColor bg-sky-100 p-2.5 text-xs font-bold text-sky-700 outline-none placeholder:text-sky-700 sm:text-lg`}
            placeholder="Enter email here..."
            required
          />
          <div className="absolute right-2 sm:right-0 bottom-2 flex justify-end ">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await handleSaveEmail();
              }}
              className="min-w-[80px] rounded-lg border-none bg-gradient-to-r from-blue-700 to-blue-300 px-4  py-1 text-xs font-medium text-white outline-none hover:saturate-150 sm:px-4 sm:py-1 sm:text-sm "
            >
              {isLoading ? <CustomSpinner /> : 'save'}
            </button>
          </div>
        </form>

        <div className="relative my-16 flex w-full justify-center">
          <svg fill="none" viewBox="0 0 959 638" className="w-[950px]">
            <path
              d="m102.42 26.713c-111.39 40.196-156.64 208.99-0.768 405.83 155.88 196.84 514.74 315.11 742.47 55.77 227.73-259.34 60.618-553.78-51.487-473.86s-87.605 157.42-326.1 157.42c-138.48 0-215.59-198.76-364.11-145.16z"
              fill="#25D366"
              stroke="#25D366"
            />
          </svg>
          <div className="absolute bottom-0 left-40 flex items-center">
            <Image
              src={socialMediaImg}
              alt="It's Fate"
              width={500}
              height={450}
              quality={100}
            />
          </div>
          <div className="absolute top-20 right-0 flex items-center">
            <Image
              src={waChannelImg}
              alt="It's Fate"
              width={800}
              height={600}
              quality={100}
              className="rounded-lg shadow-max"
            />
          </div>
        </div>

        <div className="mt-32 flex w-full justify-center">
          <TextAnimation />
        </div>

        {showNotification && (
          <div
            className={
              showNotification.success
                ? `fixed top-32 right-6 z-10 rounded-lg bg-[#4cbb17] px-8 py-2 text-white `
                : `fixed top-32 right-6 z-10 rounded-lg bg-[#ff0000] px-8 py-2 text-white `
            }
          >
            {showNotification.info}
          </div>
        )}
      </div>
      <SocialMedia />
      <FAQ />
    </>
  );
}
