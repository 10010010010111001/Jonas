"use client";
import { useState } from "react";
import spxgre from "@/assets/spxgre.webp";
import fluxboca from "@/assets/FLUXBOCA.jpeg";
import festival from "../assets/festival.webp";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Event from "./event";

export default function EventsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1.65,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 1,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="flex flex-col w-full">
      <div ref={sliderRef} className="keen-slider">
        <div
          className={`keen-slider__slide ${currentSlide !== 0 && "blur-sm"}`}
        >
          <Event
            date="16 abril - Allianz Parque"
            title="Jonas Brothers | THE TOUR"
            image={fluxboca}
          />
        </div>
        <div
          className={`keen-slider__slide ${currentSlide !== 1 && "blur-sm"}`}
        >
          <Event
            date="21 outubro - Morumbi"
            title="SÃO PAULO FC X GRÊMIO"
            image={spxgre}
            disabled
          />
        </div>
        <div
          className={`keen-slider__slide ${currentSlide !== 2 && "blur-sm"}`}
        >
          <Event
            date="4 novembro - Solar Caldas"
            title="Caldas Country Festival 2023"
            image={festival}
            disabled
          />
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="flex mt-4 py-[10px] justify-center gap-2">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                type="button"
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  "border-2 border-[#d8d8d8] w-[15px] h-[15px] bg-[#d8d8d8] rounded-full cursor-pointer" +
                  (currentSlide === idx ? " bg-white border-primary" : "")
                }
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
