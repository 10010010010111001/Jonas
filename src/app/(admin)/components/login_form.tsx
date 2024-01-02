"use client";
import { login } from "@/app/(admin)/actions/login";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit_button";

const initialState = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="relative w-full flex flex-col-reverse gap-1">
        <input
          type="text"
          id="email"
          name="email"
          className="block bg-transparent border border-slate-500 focus:border-slate-400 outline-none rounded-md py-2 px-4 text-slate-200 peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="block text-sm text-slate-500 peer-focus:text-slate-400 transition-colors"
        >
          Email
        </label>
      </div>
      <div className="relative w-full flex flex-col-reverse gap-1">
        <input
          type="password"
          id="password"
          name="password"
          className="block bg-transparent border border-slate-500 focus:border-slate-400 outline-none rounded-md py-2 px-4 text-slate-200 peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="block text-sm text-slate-500 peer-focus:text-slate-400 transition-colors"
        >
          Senha
        </label>
        <small className="text-red-500 absolute -bottom-6 pl-1">
          {state?.message}
        </small>
      </div>
      <SubmitButton />
    </form>
  );
}
