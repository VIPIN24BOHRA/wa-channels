// import Link from 'next/link';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    <div className="h-[60px]">
      <div className="flex h-full items-center justify-between rounded-lg  border-[#eee] px-8 md:px-16">
        <h1 className="text-sm font-bold  text-[#000]  ">Whatsapp Channels</h1>

        <div className="flex items-center">
          {/* <p>Terms and Conditions</p> */}
          {/* <Link href="/privacy">
            <p>Privacy Policy</p>
          </Link> */}
          {/* <p>Contact</p> */}
          <p className="ml-4">2023 © Odd Bit.ae</p>
        </div>
      </div>
    </div>
  );
}
