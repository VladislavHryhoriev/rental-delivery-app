import moment from "moment";
import { Document, model, models, Schema } from "mongoose";

export interface IOrder {
  _id: string;
  createdAt: string;
  status: "process" | "completed";
  type: "contract" | "deposit" | "contract+deposit";
  deliveryType: "forward" | "back";
  // form input
  order_num: string;
  datetime: string;
  user: string;
  tool: string;
  cost_delivery: string;
  cost_rental: string;
  cost_deposit: string;
  address: string;
  coords: string;
  phone: string;
  comment: string;
}

export interface IOrderEX extends Document {
  _id: string;
  createdAt: string;
  status: "process" | "completed";
  type: "contract" | "deposit" | "contract+deposit";
  deliveryType: "forward" | "back";
  // form input
  order_num: string;
  datetime: string;
  user: string;
  tool: string;
  cost_delivery: string;
  cost_rental: string;
  cost_deposit: string;
  address: string;
  coords: string;
  phone: string;
  comment: string;
}

const getTime = () => {
  return moment().tz("Europe/Kyiv").format("DD.MM HH:mm");
};

const OrderSchema = new Schema<IOrderEX>({
  createdAt: { type: String, default: getTime },
  status: { type: String, required: true, enum: ["process", "completed"] },
  type: {
    type: String,
    required: true,
    enum: ["contract", "deposit", "contract+deposit"],
  },
  deliveryType: { type: String, required: true, enum: ["forward", "back"] },
  //
  order_num: { type: String, required: true },
  datetime: { type: String, required: true },
  user: { type: String, required: true },
  tool: { type: String, required: true },
  cost_delivery: { type: String, required: true },
  cost_rental: { type: String, required: true },
  cost_deposit: { type: String, required: true },
  address: { type: String, required: true },
  coords: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
});

const Order = models.Order || model<IOrderEX>("Order", OrderSchema);

export default Order;
