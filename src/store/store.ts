import { create } from "zustand";

interface Deliveries {
  id: number;
  type: "Привезти" | "Забрать";
  datetime: string;
  order: string;
  tool: string;
  cost: string;
  address: string;
  coordinates: string;
  phone: string;
  comments: string;
  isDone: boolean;
}

interface DeliveryStore {
  deliveries: Deliveries[];
  addDelivery: (delivery: Deliveries) => void;
  setIsDone: (id: number) => void;
}

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  deliveries: [
    {
      id: 0,
      type: "Забрать",
      datetime: "26.07 12:00",
      order: "№ 14682 Мачушенко Дмитро Олександрович",
      tool: "Віброплита ODWERK 85кг c оросительной системой (PC80T-CК) А95",
      cost: "250 оплачено",
      address: "провулок Валі Котика 17 (на карте нету)",
      coordinates: "https://maps.app.goo.gl/PRBmB9f4qdfvLC7p8",
      phone: "0663322150",
      comments: "1460 отдать",
      isDone: false,
    },
    {
      id: 1,
      type: "Забрать",
      datetime: "26.07 12:00",
      order: "№ 14682 Мачушенко Дмитро Олександрович",
      tool: "Віброплита ODWERK 85кг c оросительной системой (PC80T-CК) А95",
      cost: "250 оплачено",
      address: "провулок Валі Котика 17 (на карте нету)",
      coordinates: "https://maps.app.goo.gl/PRBmB9f4qdfvLC7p8",
      phone: "0663322150",
      comments: "1460 отдать",
      isDone: false,
    },
  ],

  setIsDone(id) {
    set((state) => ({
      deliveries: state.deliveries.map((delivery) => {
        if (delivery.id === id) {
          return { ...delivery, isDone: !delivery.isDone };
        }
        return delivery;
      }),
    }));
  },

  addDelivery: (delivery) => {
    set((state) => ({ deliveries: [...state.deliveries, delivery] }));
  },
}));
