import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import facebookImg from '../../../public/assets/images/facebook.svg';
import instaImg from '../../../public/assets/images/instagram.svg';
import twitterImg from '../../../public/assets/images/twitter.webp';

const allText = [
  'Hi, Welcome To',
  'Whatsapp Channel',
  'Share your post from',
  'Facebook',
  'Instagram',
  'Twitter',
];
const color = [
  '#ffffff',
  '#017cff',
  '#faf0e6',
  '#0047ab',
  '#FD1D1D',
  '#00acee',
];

export default function TextAnimation() {
  const [text, setText] = useState(
    <motion.h1
      key={allText[0]}
      className={
        'text-6xl font-extrabold  text-2xl sm:text-4xl md:text-6xl text-white'
      }
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],

        transition: { duration: '2' },
      }}
    >
      <span className="animate-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
        {allText[0]}
      </span>
    </motion.h1>
  );
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      const idx = (index + 1) % allText.length;
      const val = allText[idx] ?? '';

      setText(
        <motion.h1
          key={val}
          className={
            'flex items-center text-2xl sm:text-4xl md:text-6xl font-extrabold'
          }
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],

            transition: { duration: '2' },
          }}
          style={{ color: color[idx] }}
        >
          {val.toLowerCase() === 'facebook' && (
            <Image
              src={facebookImg}
              alt="It's Fate"
              width={65}
              height={65}
              quality={100}
            />
          )}
          {val.toLowerCase() === 'twitter' && (
            <Image
              src={twitterImg}
              alt="It's Fate"
              width={65}
              height={65}
              quality={100}
            />
          )}
          {val.toLowerCase() === 'instagram' && (
            <Image
              src={instaImg}
              alt="It's Fate"
              width={65}
              height={65}
              quality={100}
            />
          )}
          <span
            className={
              idx === 0 || idx === 2
                ? 'ml-4 inline-block animate-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 bg-clip-text text-transparent'
                : 'ml-4 inline-block'
            }
          >
            {val}
          </span>
        </motion.h1>
      );
      setIndex(idx);
    }, 2000);
  }, [text]);

  if (text) return text;
  return null;
}
