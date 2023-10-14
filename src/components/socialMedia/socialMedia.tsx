import Image from 'next/image';
import { useEffect, useState } from 'react';

import facebookImg from '../../../public/assets/images/facebook.svg';
import instaImg from '../../../public/assets/images/instagram.svg';
import twitterImg from '../../../public/assets/images/twitter.webp';

const images = [facebookImg, instaImg, twitterImg];

export default function SocialMedia() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentImage]);

  return (
    <div className="mt-32 flex flex-col items-center">
      <p className="mb-4 inline-block rounded-lg bg-[rgba(1,124,255,.1)] px-4 py-2 text-sm">
        INTEGRATIONS
      </p>
      <h1 className="text-2xl font-bold sm:text-4xl">
        <span className="text-[#017cff]">Use</span> Whatsapp Channel with
      </h1>
      <div className="my-16 flex w-full items-center justify-evenly">
        {images.map((i, idx) => {
          return (
            <div
              key={`socialMedia${idx}`}
              className={
                idx === currentImage
                  ? 'shadow-maxBlue flex h-[110px] w-[110px] items-center justify-center rounded-3xl'
                  : 'shadow-max hover:shadow-maxBlue flex h-[110px] w-[110px] items-center justify-center rounded-3xl'
              }
            >
              <Image
                src={i}
                alt="It's Fate"
                width={65}
                height={65}
                quality={100}
              />
            </div>
          );
        })}{' '}
      </div>
    </div>
  );
}
