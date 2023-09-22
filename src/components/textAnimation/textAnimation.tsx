import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const allText = ['cooking', 'gaming', 'travel', 'vlog', 'fashion'];

export default function TextAnimation() {
  const [text, setText] = useState(
    <motion.h1
      key={allText[0]}
      className={'text-2xl font-extrabold text-white '}
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
          className={'flex items-center justify-center text-2xl font-extrabold'}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],

            transition: { duration: '2' },
          }}
        >
          <span className="animate-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
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
