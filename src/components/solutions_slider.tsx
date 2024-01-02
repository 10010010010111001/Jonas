"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/legacy/image";
import atendimento from "@/assets/atendimento.png";
import inteligencia from "@/assets/inteligencia.png";
import relatorios from "@/assets/relatorios.png";
import controle from "@/assets/controle.png";

export default function SolutionsSlider() {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      origin: "auto",
      perView: 4,
      spacing: 128,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 1,
          origin: "center",
        },
      },
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className={`keen-slider__slide`}>
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <div className="rounded-full border w-[110px] h-[110px] flex items-center justify-center">
            <Image src={atendimento} width={50} height={50} alt="Atendimento" />
          </div>
          <strong className="font-bold">
            Atendimento exclusivo e humanizado
          </strong>
          <p>
            Equipe interna dedicada ao relacionamento com o produtor e
            consumidores do evento.
          </p>
        </div>
      </div>
      <div className={`keen-slider__slide`}>
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <div className="rounded-full border w-[110px] h-[110px] flex items-center justify-center">
            <Image
              src={inteligencia}
              width={50}
              height={50}
              alt="Inteligência"
            />
          </div>
          <strong className="font-bold">Inteligência de mídia e B.I</strong>
          <p>
            Todo o suporte em marketing digital para melhorar sua performance em
            vendas.
          </p>
        </div>
      </div>
      <div className={`keen-slider__slide`}>
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <div className="rounded-full border w-[110px] h-[110px] flex items-center justify-center">
            <Image src={relatorios} width={50} height={50} alt="Relatórios" />
          </div>
          <strong className="font-bold">Relatórios financeiros</strong>
          <p>
            Acompanhamento real-time das vendas pelo celular, onde você estiver.
          </p>
        </div>
      </div>
      <div className={`keen-slider__slide`}>
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <div className="rounded-full border w-[110px] h-[110px] flex items-center justify-center">
            <Image src={controle} width={50} height={50} alt="Controle" />
          </div>
          <strong className="font-bold">Controle de acesso</strong>
          <p>
            Tecnologia de ponta na gestão e controle de acessos, além de uma
            equipe de técnicos especializados.
          </p>
        </div>
      </div>
    </div>
  );
}
