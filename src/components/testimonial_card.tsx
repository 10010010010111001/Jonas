import Image from "next/legacy/image";
import { Testimonial } from "./testimonials_slider";

export default function TestimonialCard({
  owner,
  company,
  text,
  image,
}: Testimonial) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-8 border border-[#eee] rounded-[5px] w-[275px] md:w-[336px] bg-white">
      <header className="flex w-full gap-4">
        <div className="rounded-full w-[50px] h-[50px] relative">
          <Image
            src={image}
            alt=""
            layout="fill"
            className="overflow-hidden rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <strong>{owner}</strong>
          <span>{company}</span>
        </div>
      </header>
      <p>{text}</p>
    </div>
  );
}
