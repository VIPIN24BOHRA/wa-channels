export default function Header() {
  return (
    <div className="sticky top-0 z-10 my-4 flex h-[75px] w-full items-center border-b-[1px] bg-white px-16 text-[#000] shadow">
      <h1 className="text-2xl font-bold ">Whatsapp Channels</h1>
      <div className="grow"></div>
      <button className="mr-8 text-xl underline">Log in</button>
      <button className="rounded-3xl bg-[#000] px-8 py-2 font-bold text-white">
        Try for free
      </button>
    </div>
  );
}
