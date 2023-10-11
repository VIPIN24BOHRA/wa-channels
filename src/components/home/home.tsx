import Image from 'next/image';
import { useState } from 'react';

import CustomSpinner from '@/components/customSpinner';
import FAQ from '@/components/faq/faq';
import SocialMedia from '@/components/socialMedia/socialMedia';
import TextAnimation from '@/components/textAnimation/textAnimation';

import socialMediaImg from '../../../public/assets/images/socialMediaBox.png';
import waChannelSsImg from '../../../public/assets/images/waChannelSs.png';

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
        setShowNotification({
          success: true,
          info: 'Success! Thanks for joining our waitlist',
        });
        (window as any).twq('event', 'tw-ogp7m-ogp7r', {
          email_address: email, // Pass the user's email address
        });
        setEmail('');
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
          Transform your
          <br />
          <span className="text-[#25D366]">Socials into WhatsApp Channel </span>
          <br /> with ease!
        </h1>

        <p className="mt-4 text-center font-[500] text-[#404040]">
          Share your social media posts on the new WhatsApp channel feature
          automatically.
        </p>

        <h3 id="joinWaitlist" className="mt-8 text-center text-2xl ">
          Secure your spot for our beta launch
          <br />
          <span className="text-6xl">👇</span>
        </h3>
        <form className="relative mt-8 flex flex-col items-stretch  justify-center md:flex-row md:items-start">
          <div>
            <input
              type="url"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={` block w-[350px] rounded-lg bg-[#000] p-4 text-xs font-bold text-white outline-none placeholder:text-[#eee] min-[425px]:w-[400px] sm:ml-4 sm:w-[600px] sm:text-lg`}
              placeholder="Enter email here..."
              required
            />
            <p className="ml-4 text-xs italic text-[#555]">
              <span className="text-[#ff0000]">*</span>Your email is safe with
              us. No spam, just updates.
            </p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await handleSaveEmail();
              }}
              className="animate-text w-full rounded-[50px]  bg-white bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 px-8 py-2 text-lg font-bold text-white outline-none hover:saturate-150 sm:px-8 sm:py-4 sm:text-lg md:w-[200px] "
            >
              {isLoading ? <CustomSpinner /> : 'join waitlist'}
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
          <div className="hover: absolute top-10 left-0 flex items-center sm:top-20 sm:left-10 md:top-40 md:left-20 lg:bottom-0 lg:left-40 xl:left-40">
            <Image
              src={socialMediaImg}
              alt="It's Fate"
              width={300}
              height={200}
              quality={100}
              className="h-auto w-[140px] rounded-lg shadow-lg sm:w-[200px] md:w-[250px] min-[1400px]:w-[300px]"
            />
          </div>
          <div className="absolute top-0 right-[20px] flex items-center md:right-[5%] lg:top-20 lg:right-[20%] xl:right-[35%]">
            <Image
              src={waChannelSsImg}
              alt="It's Fate"
              width={300}
              height={400}
              quality={100}
              className="shadow-max h-auto w-[150px] rounded-lg sm:w-[220px] md:w-[280px] min-[1400px]:w-[300px] "
            />
          </div>
        </div>

        <div className="mt-16 w-full text-center text-2xl font-bold">
          Connect with followers via your
          <span className="inline-block w-[150px] px-4 text-center">
            <TextAnimation />
          </span>
          WhatsApp channel
        </div>

        {showNotification && (
          <div
            className={
              showNotification.success
                ? `fixed top-24 right-0 z-10 w-full rounded-lg bg-[#4cbb17] px-8 py-2 text-2xl font-semibold text-white sm:right-6 sm:w-auto `
                : `fixed top-24 right-0 z-10 w-full rounded-lg bg-[#ff0000] px-8 py-2 text-2xl font-semibold text-white sm:right-6 sm:w-auto `
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
