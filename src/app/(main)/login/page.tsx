"use client";
import { Button } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/store/useLoginStore";

const registerFormSchema = z.object({
  name: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "É obrigatório informar um nome."),
  cpf: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "É obrigatório informar um CPF."),
  email: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "É obrigatório informar um email.")
    .email("Informe um formato de email válido.")
    .toLowerCase(),
  phone: z
    .string({ required_error: "O telefone é obrigatório." })
    .min(1, "É obrigatório informar um telefone."),
});
type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function LoginPage() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    values: {
      cpf: "",
      phone: "",
      name: "",
      email: "",
    },
  });
  const router = useRouter();
  const { setInfo } = useLoginStore();

  const cpfValue = form.watch("cpf");
  const phoneValue = form.watch("phone");

  function formatCPF(value: string | undefined) {
    if (!value) return "";

    return value
      .replace(/[\D]/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
  function formatPhone(value: string) {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  }

  useEffect(() => {
    form.setValue("cpf", formatCPF(cpfValue));
    form.setValue("phone", formatPhone(phoneValue));
  }, [cpfValue, phoneValue, form]);

  function submitForm(data: RegisterFormData) {
    setInfo(data);
    router.push("/pagamento");
  }

  return (
    <div className="mt-[4.5rem] border h-[calc(100vh-4.5rem)] flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[1.5rem] font-bold">Bem-vindo.</h1>
        <p>Confirme seus dados para continuar</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="space-y-4 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <input
                      maxLength={15}
                      placeholder="Ex: Maria Silva"
                      className="border border-[#292929] rounded-md py-3 px-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <input
                      maxLength={15}
                      placeholder="Ex: 123.456.789-10"
                      className="border border-[#292929] rounded-md py-3 px-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <input
                      maxLength={15}
                      placeholder="Ex: 11 9 9999-9999"
                      className="border border-[#292929] rounded-md py-3 px-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      placeholder="Ex: seuemail@exemplo.com"
                      className="border border-[#292929] rounded-md py-3 px-2 w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" variant="primary">
              Continuar
            </Button>
          </form>
        </Form>
        <p>
          Ao clicar em continuar, você concorda com <br /> nossos termos de uso
          e políticas de privacidade.
        </p>
      </div>
    </div>
  );
}
