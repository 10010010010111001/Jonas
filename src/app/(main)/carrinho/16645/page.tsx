"use client";
import Cart from "@/components/cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { CartItem, useCartStore } from "@/store/useCartSore";
import { ticketsMock } from "@/ticketsMock";
import { Ticket } from "@/types";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

export default function CartPage() {
  return (
    <div className="mt-[4.5rem] px-4 flex flex-col gap-6 mx-auto py-4 lg:max-w-[1100px]">
      <SelectDate />
      <SelectSector />
    </div>
  );
}

function SelectDate() {
  return (
    <div>
      <strong className="font-bold text-[1.5rem]">Selecione o dia:</strong>
      <div className="mt-4">
        <div className="pt-4 border border-[#eee] rounded-sm w-[150px] h-[102px] flex items-center justify-center flex-col border-b-0 gap-1 cursor-pointer relative after:content-[''] after:bottom-[-1px] after:w-full after:h-px after:bg-white after:absolute">
          <strong className="font-bold text-primary">16/04/2024</strong>
          <span>SÁB. 19:00</span>
          <i>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#00a1ba"
              className="w-8 h-8 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </i>
        </div>
        <div className="p-4 border border-[#eee] rounded-sm">
          <span>Jonas Brothers | THE TOUR</span>
        </div>
      </div>
    </div>
  );
}

function SelectSector() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    disabled: true,
    breakpoints: {
      "(max-width: 1024px)": {
        disabled: false,
        loop: false,
        mode: "snap",
        slides: {
          perView: 2,
          spacing: 4,
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
    <div className="overflow-x-hidden">
      <div className="flex items-center gap-4">
        <strong className="font-bold text-[1.5rem]">Selecione o setor:</strong>
        {loaded && instanceRef.current && (
          <div className="flex gap-2">
            <ArrowLeft
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
            />

            <ArrowRight
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
            />
          </div>
        )}
      </div>
      <Tabs className="mt-6" defaultValue="1">
        <TabsList>
          <div
            ref={sliderRef}
            className="keen-slider flex max-w-[335px] lg:max-w-full"
          >
            <div className="keen-slider__slide">
              <TabsTrigger value="1">Todos</TabsTrigger>
            </div>
            <div className="keen-slider__slide">
              <TabsTrigger value="3">PISTA</TabsTrigger>
            </div>
            <div className="keen-slider__slide">
              <TabsTrigger value="5">CADEIRA SUPERIOR</TabsTrigger>
            </div>
            <div className="keen-slider__slide">
              <TabsTrigger value="6">CADEIRA INFERIOR</TabsTrigger>
            </div>
          </div>
        </TabsList>
        <TabsContent className="flex flex-col gap-4" value="1">
          {ticketsMock.map((ticket: Ticket) => (
            <TicketOption key={ticket.id} ticket={ticket} />
          ))}
        </TabsContent>
        <TabsContent className="flex flex-col gap-4" value="2">
          {ticketsMock
            .filter((ticket: Ticket) => ticket.title.includes("PISTA PREMIUM"))
            .map((ticket: Ticket) => (
              <TicketOption key={ticket.id} ticket={ticket} />
            ))}
        </TabsContent>
        <TabsContent className="flex flex-col gap-4" value="3">
          {ticketsMock
            .filter((ticket: Ticket) => ticket.title.includes("PISTA"))
            .map((ticket: Ticket) => (
              <TicketOption key={ticket.id} ticket={ticket} />
            ))}
        </TabsContent>
        <TabsContent className="flex flex-col gap-4" value="4">
          {ticketsMock
            .filter((ticket: Ticket) => ticket.title.includes("ARQUIBANCADA"))
            .map((ticket: Ticket) => (
              <TicketOption key={ticket.id} ticket={ticket} />
            ))}
        </TabsContent>
        <TabsContent className="flex flex-col gap-4" value="5">
          {ticketsMock
            .filter((ticket: Ticket) => ticket.title.includes("CADEIRA SUPERIOR"))
            .map((ticket: Ticket) => (
              <TicketOption key={ticket.id} ticket={ticket} />
            ))}
        </TabsContent>
        <TabsContent className="flex flex-col gap-4" value="6">
          {ticketsMock
            .filter((ticket: Ticket) => ticket.title.includes("CADEIRA INFERIOR"))
            .map((ticket: Ticket) => (
              <TicketOption key={ticket.id} ticket={ticket} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ArrowLeft(props: { onClick: (e: any) => void }) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

function ArrowRight(props: { onClick: (e: any) => void }) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

interface TicketOptionProps {
  ticket: Ticket;
}

function TicketOption({ ticket }: TicketOptionProps) {
  const { items, addItem, increaseItemAmount, decreaseItemAmount, removeItem } =
    useCartStore();

  function handleAddItem(ticket: Ticket) {
    const itemToIncrease = items.find((item) => item.ticket.id === ticket.id);
    if (itemToIncrease) {
      increaseItemAmount(itemToIncrease);
      return;
    }
    addItem(ticket);
  }

  function handleDecreaseItem(ticket: Ticket) {
    const itemToDecrease = items.find((item) => item.ticket.id === ticket.id);
    if (itemToDecrease && itemToDecrease.amount > 1) {
      decreaseItemAmount(itemToDecrease);
      return;
    }
    removeItem(ticket);
  }

  return (
    <>
      <div className="border border-[#e1e1e1] rounded-[6px] border-l-[9px] hover:border-primary-light transition-colors duration-300 p-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div>
          <span className="uppercase">{ticket.title}</span>
          <span> - {ticket.type}</span>
          <div className="flex gap-2 items-center mt-2">
            {ticket.type === "Inteira" && (
              <strong className="block text-primary text-[1.25rem] font-bold">
                {ticket.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            )}
            {ticket.type === "Meia" && (
              <strong className="block text-primary text-[1.25rem] font-bold">
                {(ticket.price / 2).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            )}
            <span className="text-[.975rem] text-[#9b9b9b]">LOTE FINAL</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleDecreaseItem(ticket)}
            type="button"
            className="flex items-center justify-center text-[18px] text-[#aeaeae] font-bold w-[18px] h-[18px] border border-[#aeaeae] hover:border-primary hover:text-primary transition-colors rounded-sm disabled:cursor-not-allowed"
          >
            -
          </button>
          {items.find((item) => item.ticket.id === ticket.id)?.amount || 0}
          <button
            onClick={() => handleAddItem({ ...ticket })}
            type="button"
            className="flex items-center justify-center text-[18px] text-[#aeaeae] font-bold w-[18px] h-[18px] border border-[#aeaeae] hover:border-primary hover:text-primary transition-colors rounded-sm disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0">
          <Cart />
        </div>
      )}
    </>
  );
}
