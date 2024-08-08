import { IOrder } from "@/models/order.model";

export default async function getAllOrders(
  status: "process" | "completed",
): Promise<IOrder[] | []> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/orders/get-all-orders?status=${status}`,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
