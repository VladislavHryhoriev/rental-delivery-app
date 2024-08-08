import moment from "moment";
import { Document, model, models, Schema } from "mongoose";

export interface IOrder {
  _id: string;
  createdAt: () => Date;
  status: string;
  datetime: string;
  order: string;
  tool: string;
  cost: string;
  address: string;
  coords: string;
  phone: string;
  comment: string;
}

export interface IOrderEX extends Document {
  _id: string;
  createdAt: () => Date;
  status: string;
  datetime: string;
  order: string;
  tool: string;
  cost: string;
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
  status: { type: String, required: true },
  datetime: { type: String, required: true },
  order: { type: String, required: true },
  tool: { type: String, required: true },
  cost: { type: String, required: true },
  address: { type: String, required: true },
  coords: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
});

const Order = models.Order || model<IOrderEX>("Order", OrderSchema);

export default Order;
