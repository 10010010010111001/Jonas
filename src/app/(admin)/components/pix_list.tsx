"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { Pix } from "@/types";
import { useEffect, useState } from "react";
import { PixDataTable, pixColumns } from "./pix-data-table";

export default function PixList({ pixs }: { pixs: Pix[] }) {
  const { supabaseBrowserClient } = useSupabase();
  const [pixList, setPixList] = useState(pixs);

  useEffect(() => {
    const channel = supabaseBrowserClient
      .channel("realtime pixs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pix",
        },
        (payload) => {
          setPixList([...pixs, payload.new as Pix]);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "pix",
        },
        (payload) => {
          setPixList([...pixs.filter((pix) => pix.id !== payload.old.id)]);
        },
      )
      .subscribe();

    return () => {
      supabaseBrowserClient.removeChannel(channel);
    };
  }, [supabaseBrowserClient, pixList, setPixList, pixs]);
  return (
    <div className="px-4 mt-8">
      <PixDataTable columns={pixColumns} data={pixList} />
    </div>
  );
}
