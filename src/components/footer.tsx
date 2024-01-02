"use client";
import Image from "next/legacy/image";
import logo from "../assets/logo.png";
import facebook_black from "../assets/facebook_black.svg";
import youtube from "../assets/youtube.svg";
import instagram from "../assets/instagram.svg";
import cpa from "../assets/cpa.svg";
import confi from "../assets/confi.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("login") || pathname.includes("pagamento")) return null;

  return (
    <footer className="w-screen max-w-[99vw] bg-[#fbfbfb] flex flex-col items-center justify-center px-4 font-medium text-sm text-[#292929] mt-auto py-10">
      <div className="w-full lg:max-w-[1100px] flex flex-col gap-6 items-center justify-center lg:items-start border-b border-[#eee] py-8">
        <Link href="/">
          <Image
            src={logo}
            width={170}
            height={21}
            alt="Ir para página inicial"
          />
        </Link>
        <div className="flex w-full flex-col gap-4 items-center lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 w-full">
            <p className="max-w-[500px]">
              DIVERTI TICKETS COMERCIALIZAÇÃO DE INGRESSOS LTDA - CNPJ N.
              20.959.269/0001-07 Alameda Ezequiel Mantoanelli, n. 375, sala A,
              Bairro Jd. Panorama, cidade de Indaiatuba, Estado de São Paulo,
              CEP:13340-350.
            </p>
            <div className="flex gap-1 w-full justify-center lg:justify-start">
              <Link
                className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center"
                href="https://www.facebook.com/totalacesso"
                target="_blank"
              >
                <Image src={facebook_black} width={20} height={20} alt="" />
              </Link>
              <Link
                className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center"
                href="https://www.instagram.com/totalacesso"
                target="_blank"
              >
                <Image src={instagram} width={20} height={20} alt="" />
              </Link>
              <Link
                className="w-10 h-10 rounded-full bg-white border border-[#eee] flex items-center justify-center"
                href="https://www.youtube.com/channel/UCgUDMJd5GwzZt1hbrhWTVig"
                target="_blank"
              >
                <Image src={youtube} width={20} height={20} alt="" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-center w-full lg:justify-end">
            <Image
              src={confi}
              width={90}
              height={90}
              alt="Selo loja confiável"
            />
            <Link
              target="_blank"
              href="http://selodigital.imprensaoficial.com.br/validacao/SMPED/011fe8c6169b937d2a"
            >
              <Image
                src={cpa}
                height={70}
                width={101}
                alt="Selo de acessibilidade digital"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full lg:justify-between lg:flex-row lg:max-w-[1100px] items-center">
        <div className="flex flex-col gap-2 lg:flex-row py-8 w-full items-center">
          <Link
            href=""
            target="_blank"
            className="underline text-primary text-sm"
          >
            Central de atendimento
          </Link>
          <Link
            href=""
            target="_blank"
            className="underline text-primary text-sm"
          >
            Termos de uso
          </Link>
          <Link
            href=""
            target="_blank"
            className="underline text-primary text-sm"
          >
            Política de privacidade
          </Link>
        </div>
        <small className="lg:whitespace-nowrap">
          Atendimento PROCON - telefone 151, ou o Procon de sua cidade
        </small>
      </div>
    </footer>
  );
}
