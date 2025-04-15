import { IOrder } from "@/models/order.model";

export default async function getOrderById(id: string): Promise<IOrder | null> {
  try {
    const response = await fetch(`/api/orders/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
