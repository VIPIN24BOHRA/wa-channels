export default function Header() {
  return (
    <div className="sticky top-0 z-10 my-4 flex h-[75px] w-full items-center border-b-[1px] bg-white px-4 text-[#000] shadow min-[475px]:px-8 md:px-16">
      <h1 className=" text-base font-bold min-[475px]:text-lg md:text-2xl ">
        Whatsapp Channels
      </h1>
      <div className="grow"></div>
      <button
        className="mr-2  text-base font-bold text-gray-300 underline min-[475px]:text-lg sm:text-xl md:mr-8"
        disabled
      >
        Log in
      </button>
      <a href="#joinWaitlist">
        <button className="rounded-3xl bg-[#000] px-4 py-2 text-sm font-bold text-white sm:text-base md:px-8">
          join waitlist
        </button>
      </a>
    </div>
  );
}
