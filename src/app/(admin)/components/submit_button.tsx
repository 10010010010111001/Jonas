"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="w-full mt-4 border border-slate-500 rounded-md py-2 px-4 hover:border-slate-400 text-slate-500 hover:text-slate-400 transition-all"
    >
      Entrar
    </button>
  );
}
