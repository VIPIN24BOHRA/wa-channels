export default function Header() {
  return (
    <div className="sticky top-0 z-10 my-4 flex h-[75px] w-full items-center border-b-[1px] bg-white px-8 text-[#000] shadow md:px-16">
      <h1 className=" text-lg font-bold md:text-2xl ">Whatsapp Channels</h1>
      <div className="grow"></div>
      <button className="mr-2 text-lg font-bold underline sm:text-xl md:mr-8">
        Log in
      </button>
      <button className="rounded-3xl bg-[#000] px-4 py-2 font-bold text-white md:px-8">
        Try for free
      </button>
    </div>
  );
}
