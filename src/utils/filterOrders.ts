import { IOrder } from "@/models/order.model";
import moment from "moment";

const filterOrders = (value: string, orders: IOrder[]) => {
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
  const afterTomorrow = moment().add(2, "day").format("YYYY-MM-DD");

  let filtered = [...orders];

  // Фильтрация по дате
  if (value.includes("today")) {
    filtered = filtered.filter(
      (order) => moment(order.datetime).format("YYYY-MM-DD") === today,
    );
  } else if (value.includes("tomorrow")) {
    filtered = filtered.filter(
      (order) => moment(order.datetime).format("YYYY-MM-DD") === tomorrow,
    );
  } else if (value.includes("after-tomorrow")) {
    filtered = filtered.filter(
      (order) => moment(order.datetime).format("YYYY-MM-DD") === afterTomorrow,
    );
  }

  // Фильтрация по типу доставки
  if (value.includes("forward")) {
    filtered = filtered.filter((order) => order.deliveryType === "forward");
  } else if (value.includes("back")) {
    filtered = filtered.filter((order) => order.deliveryType === "back");
  }

  // Фильтрация по типу заказа
  if (value.includes("contract")) {
    filtered = filtered.filter((order) => order.type === "contract");
  } else if (value.includes("deposit")) {
    filtered = filtered.filter((order) => order.type === "deposit");
  } else if (value.includes("contract+deposit")) {
    filtered = filtered.filter((order) => order.type === "contract+deposit");
  }

  return filtered;
};

export default filterOrders;
