import Image from "next/legacy/image";
import logo from "../assets/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="z-50 w-screen h-[4.5rem] bg-white flex justify-between px-4 items-center border-b border-[#d8d8d8] fixed top-0 py-3 font-medium text-base text-[#292929]">
      <div className="w-full z-50 mx-auto lg:max-w-[1100px] flex items-center justify-between h-full ">
        <SearchInput />

        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <Link href="/">
            <Image
              src={logo}
              width={170}
              height={21}
              alt="Ir para página inicial"
            />
          </Link>
        </div>

        <button className="flex items-center gap-2 font-bold">
          Ajuda
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#00a1ba"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

function SearchInput() {
  return (
    <div className="flex items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        className="outline-none placeholder-[#494949] hidden md:flex"
        placeholder="Buscar eventos"
      />
    </div>
  );
}
