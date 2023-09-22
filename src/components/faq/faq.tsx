import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
// import Image from 'next/image';
import React from 'react';

// import bg from '../../public/assets/images/Background-base.png';
// import FAQImg from '../../public/assets/images/faqman1.png';
import faqData from './faqData';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = React.useState<number | null>(null);

  return (
    <section className="relative mt-32 flex items-start px-8 pb-20 lg:px-32 ">
      <div className="mt-8">
        <p className="inline-block rounded-lg bg-[rgba(1,124,255,.1)] px-4 py-2 text-sm">
          FAQ
        </p>
        <h2
          className=" text-4xl font-extrabold
text-[#000] lg:text-5xl"
        >
          Things we get asked,{' '}
          <span className="text-[#017cff]">
            a.k.a. <br /> FAQs
          </span>
        </h2>
      </div>
      <div className="w-full grow">
        <div className="flex flex-col">
          <div>
            <ul className="space-y-4">
              {faqData.map((item: FaqItem, index: number) => (
                <li
                  key={index}
                  className="rounded-2xl border-2 border-[#eee] px-4 py-2 "
                >
                  <button
                    className="ouline-none flex w-full cursor-pointer items-center justify-between rounded-md py-2 px-4 text-left text-2xl font-bold leading-8 text-[#000]"
                    // sets the index of the clicked item, or null if the clicked item is already selected
                    onClick={() =>
                      setSelectedFaq(selectedFaq === index ? null : index)
                    }
                  >
                    {item.question}
                    {selectedFaq === index ? (
                      <KeyboardArrowDownOutlinedIcon />
                    ) : (
                      <KeyboardArrowRightOutlinedIcon />
                    )}
                  </button>

                  {selectedFaq === index && (
                    <div
                      className="mt-2 px-4 font-[500]  text-[#000]"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="flex items-center justify-center">
            <Image
              src={FAQImg}
              alt="Your-Image"
              width={200}
              height={200}
              quality={100}
            />
          </div> */}
        </div>
      </div>

      {/* <div className="absolute bottom-0 w-screen">
        <Image src={bg} alt="df" />
      </div> */}
    </section>
  );
};

export default FAQ;
