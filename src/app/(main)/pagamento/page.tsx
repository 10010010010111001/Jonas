"use client";

import { CartItem, useCartStore } from "@/store/useCartSore";
import { useLoginStore } from "@/store/useLoginStore";
import Image from "next/legacy/image";
import pix from "@/assets/pix.svg";
import { Button } from "@/components/button";
import axios from "axios";
import { useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";

interface PixInfo {
  base64: string;
  code: string;
}

export default function PaymentPage() {
  const [pixInfo, setPixInfo] = useState<PixInfo | null>(null);
  const { info } = useLoginStore();
  const { items } = useCartStore();
  const { supabaseBrowserClient } = useSupabase();

  const totalItemsValue = items.reduce((acc, item) => {
    if (item.ticket.type === "Meia")
      return acc + (item.ticket.price * item.amount) / 2;
    else return acc + item.ticket.price * item.amount;
  }, 0);

  async function generateQr() {
    if (pixInfo) return;

    const reqBody = {
      amount: `R$ ${totalItemsValue.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`,
      city: "RJ",
      key: "rooseveltyyy@gmail.com",
      key_type: "email",
      name: "Total Acesso",
      reference: "Total Acesso",
    };

    const { data } = await axios.post(
      "https://gerador-pix-production.up.railway.app/emvqr-static",

      reqBody,
    );

    if (data && info) {
      setPixInfo({
        base64: data.qrcode_base64,
        code: data.code,
      });

      const { data: supaData, error } = await supabaseBrowserClient
        .from("pix")
        .insert({
          buyer_email: info?.email,
          buyer_name: info?.name,
          buyer_doc: info?.cpf,
          buyer_phone: info?.phone,
          amount: totalItemsValue,
        });

      console.log({ supaData, error });
    }
  }

  return (
    <div className="mt-[4.5rem]">
      <div className="w-full bg-[#292929] flex items-center justify-center flex-col py-6 text-white">
        <strong className="text-white text-[1.5rem] font-bold">
          Pedido 16645
        </strong>
        <span>TAYLOR SWIFT | THE ERAS TOUR</span>
      </div>
      <div className="flex items-center gap-2 bg-[#edeef2] py-2 px-2.5 text-[12px] lg:text-base justify-center">
        <div>Escolha de ingressos</div>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ccc"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </i>
        <div>Identificação</div>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#ccc"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </i>
        <div className="text-primary font-bold">Pagamento</div>
      </div>
      <div className="max-w-[1100px] p-4 mx-auto">
        <strong className="text-[1.5rem]">Seu pedido</strong>
        <p>Revise seu pedido antes de confirmar o pagamento.</p>
        <div className="border my-2">
          <div className="flex flex-col gap-4">
            {items.map((item: CartItem) => (
              <div key={item.ticket.id}>
                <div className="bg-[#edeef2] p-2">
                  <strong>
                    {item.ticket.title} - LOTE FINAL - {item.ticket.type}
                  </strong>
                </div>
                <div className="w-full border-b border-[#edeef2] p-2 flex justify-between">
                  <strong>Preço</strong>
                  <span>
                    {(item.ticket.type === "Inteira"
                      ? item.ticket.price
                      : item.ticket.price / 2
                    ).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="w-full border-b border-[#edeef2] p-2 flex justify-between">
                  <strong>Taxa de conveniência</strong>
                  <span>
                    {(0).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="w-full border-b border-[#edeef2] p-2 flex justify-between">
                  <strong>Qtd</strong>
                  <span>{item.amount}x</span>
                </div>
                <div className="w-full border-b border-[#edeef2] p-2 flex justify-between">
                  <strong>Total</strong>
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
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center py-2 text-black bg-[#edeef2] text-center">
            <span>Forma de entrega: e-ticket ({info?.email})</span>
          </div>
          <div className="w-full flex justify-center items-center py-2 text-black">
            <span>Taxa de conveniência: grátis</span>
          </div>
          <div className="w-full flex justify-center items-center py-2 text-black bg-[#edeef2]">
            <span>Valor total</span>
          </div>
          <div className="w-full flex justify-center items-center py-2 text-primary font-bold text-[1.25rem]">
            <span>
              {" "}
              {totalItemsValue.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <strong className="text-[1.5rem]">Opções de pagamento</strong>
          <p>Escolha a melhor opção de pagamento para você.</p>
          <div className="mt-4 text-center">
            <div className="bg-[#edeef2] px-4 py-4 pb-0 lg:py-2 rounded-md rounded-b-none flex items-center justify-center lg:w-fit cursor-pointer">
              <Image src={pix} height={40} width={80} alt="pix" />
            </div>
            <div className="bg-[#edeef2] p-7">
              <p className="text-[18px] font-semibold">
                Siga nossas instruções para não ter problema no pagamento do seu
                pedido.
              </p>
              <div className="space-y-2 mt-4">
                {pixInfo && (
                  <div className="bg-white rounded-md p-10 flex flex-col text-center justify-center items-center gap-4">
                    <span>Valor da compra:</span>
                    <strong className="text-[2rem] text-[#4bb8a9]">
                      {totalItemsValue.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                    <div className="border-4 border-[#edeef2] w-[200px] h-[200px]">
                      <Image
                        src={pixInfo.base64}
                        alt="QRCode"
                        width={200}
                        height={200}
                      />
                    </div>
                    <p>Se preferir, copie e cole o código:</p>
                    <div className="max-w-[350px] w-full bg-[#edeef2] text-[#aaa] text-[12px] border border-[#ccc] p-2.5 overflow-hidden">
                      <p>{pixInfo.code}</p>
                    </div>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(pixInfo.code)
                      }
                      type="button"
                      className="text-[12px] border border-black max-w-[350px] w-full p-2.5 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white"
                    >
                      <i>
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
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                          />
                        </svg>
                      </i>
                      Copiar código
                    </button>
                    <p>Aguardando confirmação do pagamento...</p>
                  </div>
                )}
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    1
                  </div>
                  <p>Geração do seu código QR Code para pagamento.</p>
                </div>
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    2
                  </div>
                  <p>
                    Abra o aplicativo do seu banco e entre na <b>área Pix.</b>
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    3
                  </div>
                  <p>
                    Selecione <b>&quot;pagar com Pix&quot;</b> ou{" "}
                    <b>&quot;pagar com QR Code&quot;</b>.
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    4
                  </div>
                  <p>
                    Faça a <b>leitura do QR Code</b> e confirme o pagamento no
                    aplicativo.
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    5
                  </div>
                  <p>
                    Aguarde a confirmação do pagamento e você será
                    redirecionado.
                  </p>
                </div>
                <div className="bg-white rounded-md p-3 flex gap-2 items-center flex-col lg:flex-row justify-center lg:justify-start">
                  <div className="rounded-full border-2 border-[#4bb8a9] text-[#4bb8a9] w-[30px] h-[30px] flex items-center justify-center font-bold">
                    6
                  </div>
                  <p>Pronto, pedido finalizado com sucesso.</p>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => generateQr()} className="ml-auto mt-2">
            Pagar com Pix
          </Button>
        </div>
      </div>
    </div>
  );
}
