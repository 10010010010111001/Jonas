"use client";
import { useCartStore } from "@/store/useCartSore";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { useRouter } from "next/navigation";

export default function Cart({
  takesToPayment = false,
}: {
  takesToPayment?: boolean;
}) {
  const { items } = useCartStore();
  const router = useRouter();

  function handleContinue() {
    if (takesToPayment) {
      router.push("/login");
    }
  }

  const totalItemsAmount = items.reduce((acc, item) => acc + item.amount, 0);
  const totalItemsValue = items.reduce((acc, item) => {
    if (item.ticket.type === "Meia")
      return acc + (item.ticket.price * item.amount) / 2;
    else return acc + item.ticket.price * item.amount;
  }, 0);

  return (
    <div className="bg-[#292929] w-full h-[130px] px-4 py-2 flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex lg:flex-1">
        <div className="flex flex-col px-4 py-2 lg:flex-1">
          <span className="text-[14px] text-white">Carrinho</span>
          <strong className="text-base text-primary">
            {totalItemsAmount} {totalItemsAmount > 1 ? "Itens" : "Item"}
          </strong>
        </div>
        <div className="flex flex-col w-full bg-[rgba(243,243,243,0.1)] px-4 py-2 lg:flex-1">
          <span className="text-[14px] text-white">Total</span>
          <strong className="text-base text-primary">
            {totalItemsValue.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </div>
      </div>
      <Dialog>
        <DialogTrigger
          onClick={handleContinue}
          className="mx-auto w-full max-w-[300px] font-bold uppercase text-[14px] lg:text-[12px] lg:py-3 flex items-center py-[.45rem] px-[.9rem] rounded-[50rem] text-base justify-center transition-colors focus-visible:outline-none bg-primary text-white hover:bg-primary-light"
        >
          Continuar
        </DialogTrigger>
        <DialogContent className="max-w-[800px]">
          <DialogHeader className="w-full bg-[#292929] flex items-center justify-center py-4">
            <DialogTitle className="text-primary text-[1.5rem] font-bold">
              Revisar pedido
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white py-5 px-3">
            <div>
              <strong>Jonas Brothers | THE TOUR</strong>
              <div className="flex gap-1">
                <i className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#292929"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </i>
                <p className="text-[#292929]">
                  16 de abril de 2024, Avenida Francisco Matarazzo 1705, São Paulo - SP
                </p>
              </div>
              <div className="w-full h-px bg-[#e1e1e1] my-4" />
              <div>
                {items.map((item) => (
                  <div
                    key={item.ticket.id}
                    className="flex flex-col gap-1 w-full pb-2 border-b border-[#e1e1e1] border-dashed mt-2"
                  >
                    <div className="w-full flex justify-between">
                      <span>
                        {item.ticket.title} {item.ticket.type} LOTE FINAL
                      </span>
                      <strong className="text-primary">
                        {(item.ticket.type === "Inteira"
                          ? item.ticket.price
                          : item.ticket.price / 2
                        ).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </div>
                    <div className="w-full flex justify-between">
                      <span>Quantidade: {item.amount}</span>
                      <span>
                        {(
                          (item.ticket.type === "Inteira"
                            ? item.ticket.price
                            : item.ticket.price / 2) * item.amount
                        ).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    <div className="w-full flex justify-between">
                      <span>Taxa de conveniência</span>
                      <span>
                        {(0).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Cart takesToPayment={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
