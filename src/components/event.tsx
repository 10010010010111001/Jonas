import Link from "next/link";
import { Button } from "./button";
import Image, { StaticImageData } from "next/legacy/image";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import wpp from "../assets/wpp.svg";

interface EventProps {
  disabled?: boolean;
  title: string;
  date: string;
  image: HTMLImageElement | StaticImageData;
}

export default function Event({
  disabled = false,
  date,
  image,
  title,
}: EventProps) {
  return (
    <div className="flex sm:min-h-[800px] lg:min-h-[475px] flex-col px-2 md:p-0 lg:flex-row">
      <div className="bg-[#121212] p-4 gap-4 flex flex-col lg:gap-12 items-start justify-center text-white min-w-[330px] lg:max-w-[370px] rounded-t-[5px] md:rounded-t-0 md:rounded-l-[5px] md:rounded-r-0 ">
        <span>{date}</span>
        <h2 className="text-3xl uppercase font-bold">{title}</h2>
        <div className="flex gap-2">
          <Link href={`${disabled ? "" : "/eventos/16645"}`}>
            <Button className="font-bold" variant="alt">
              Saiba mais
            </Button>
          </Link>
          <Link href={disabled ? "" : "/carrinho/16645"}>
            <Button className="font-bold">Comprar</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4 font-bold">
          <small>compartilhe</small>
          <div className="flex gap-1">
            <Button
              variant="alt"
              className="w-10 h-10 p-2 border-[1.5px] border-white hover:bg-primary-light hover:border-primary-light"
            >
              <Image src={facebook} width={37} height={47} alt="" />
            </Button>
            <Button
              variant="alt"
              className="w-10 h-10 p-2 border-[1.5px] border-white hover:bg-primary-light hover:border-primary-light"
            >
              <Image src={twitter} width={37} height={47} alt="" />
            </Button>
            <Button
              variant="alt"
              className="w-10 h-10 p-2 border-[1.5px] border-white hover:bg-primary-light hover:border-primary-light"
            >
              <Image src={wpp} width={37} height={47} alt="" />
            </Button>
          </div>
        </div>
      </div>
      <Link
        className="relative flex-1 w-full min-h-[195px] lg:min-w-[745px]"
        href="/eventos/16645"
      >
        <Image
          src={image}
          alt=""
          layout="fill"
          className="rounded-r-[5px] object-cover"
        />
      </Link>
    </div>
  );
}
