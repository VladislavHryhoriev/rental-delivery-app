import { create } from "zustand";

interface OrdersStore {}

export const useOrdersStore = create<OrdersStore>((set, get) => ({}));
