"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import TestimonialCard from "./testimonial_card";
import caire from "../assets/caire.webp";
import jerominho from "../assets/jerominho.jpg";
import heron from "../assets/heron.jpg";
import zeluis from "../assets/zeluis.jpg";
import { StaticImageData } from "next/legacy/image";

export type Testimonial = {
  owner: string;
  company: string;
  text: string;
  image: StaticImageData;
};

const testimonials: Testimonial[] = [
  {
    owner: "José Luiz Meneghel (Pé)",
    company: "Clube dos Cavaleiros",
    text: "A longa parceria do Clube dos Cavaleiros com a Total Acesso é resultado da qualidade da sua entrega. Desde a produção e acabamento dos ingressos até a dedicação da equipe e a pontualidade dos repasses. Além disso, eles sempre estão em linha com as mais novas tecnologias de pagamento e acesso.",
    image: zeluis,
  },
  {
    owner: "Jeromino Muzetti (Jerominho)",
    company: "Festa do Peão de Boiadeiro de Barretos",
    text: "Nossos eventos começam na experiência de compra dos visitantes. Por isso, nós de Os Independentes valorizamos e temos muito orgulho da parceria com a Total Acesso. Em todos nossos eventos, incluindo a Festa do Peão de Barretos e o Barretos Motorcycles, escolhemos a Total Acesso que garante segurança de ponta a ponta para o usuário e excelência no atendimento, traduzindo nosso DNA de satisfação total do cliente.",
    image: jerominho,
  },
  {
    owner: "Heron Schneider",
    company: "LIESA",
    text: "A LIESA não renuncia ao atendimento exclusivo e segurança que a Total Acesso oferece. O sistema de gestão, o atendimento ao usuário e a pontualidade nos repasses possibilitaram a venda de ingressos online desse evento de alta complexidade, que inclui além da venda de ingressos a prestação de contas para as 12 escolas participantes no desfile. Esperamos continuar a parceria por muitos anos.",
    image: heron,
  },
  {
    owner: "Caire Aoas",
    company: "Camarote Bar Brahma",
    text: "Pela plataforma da Total Acesso nós conseguimos possibilitar maior comodidade e segurança na venda dos nossos tickets para o Camarote Bar Brahma. Acreditamos que as pessoas buscam - e precisam - de comodidade, principalmente no que tange ao lazer. Ter esse tipo de serviço é fundamental e poder contar com quem faz isso com excelência nos deixa muito feliz e confiantes para solidificar essa parceria por mais um ano.",
    image: caire,
  },
];

export default function TestimonialsSlider() {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      origin: "auto",
      perView: 3,
      spacing: 8,
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
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`keen-slider__slide w-[275px] md:w-[336px]`}
        >
          <TestimonialCard key={index} {...testimonial} />
        </div>
      ))}
    </div>
  );
}
