import { create } from "zustand";

export type LoginInfo = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

export type LoginStoreState = {
  info: LoginInfo | null;
  setInfo: (info: LoginInfo) => void;
};

export const useLoginStore = create<LoginStoreState>((set) => ({
  info: null,
  setInfo: (info: LoginInfo) =>
    set((state: LoginStoreState) => ({
      info: info,
    })),
}));
