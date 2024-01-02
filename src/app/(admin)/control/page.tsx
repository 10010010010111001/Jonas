import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useSupabase } from "@/hooks/useSupabase";
import PixList from "../components/pix_list";
import { Pix } from "@/types";
import "../../../globals.css";

export default async function ControlPage() {
  const cookieStore = cookies();
  const { supabaseServerClient: supabase } = useSupabase(cookieStore);

  const { data } = await supabase.auth.getSession();
  const { data: pixs }: { data: Pix[] | null } = await supabase
    .from("pix")
    .select("*");

  if (!data.session) {
    redirect("/control/login");
  }

  return (
    <div className="bg-slate-800 min-h-screen border-4">
      <header className="border-b border-slate-600 h-14 flex items-center justify-center hover:bg-slate-700 transition-colors duration-200">
        <strong className="text-white text-3xl cursor-default">Ω</strong>
      </header>
      <PixList pixs={pixs ?? []} />
    </div>
  );
}
