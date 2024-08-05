import { Document, model, models, Schema } from "mongoose";

export interface IOrder {
  _id: string;
  status: string;
  datetime: string;
  order: string;
  tool: string;
  cost: string;
  address: string;
  coords: string;
  phone: string;
  comment: string;
  isDone: boolean;
}

export interface IOrderEX extends Document {
  _id: string;
  status: string;
  datetime: string;
  order: string;
  tool: string;
  cost: string;
  address: string;
  coords: string;
  phone: string;
  comment: string;
  isDone: boolean;
}

const OrderSchema = new Schema<IOrderEX>({
  status: { type: String, required: true },
  datetime: { type: String, required: true },
  order: { type: String, required: true },
  tool: { type: String, required: true },
  cost: { type: String, required: true },
  address: { type: String, required: true },
  coords: { type: String, required: true },
  phone: { type: String, required: true },
  comment: { type: String, required: true },
  isDone: { type: Boolean, required: true },
});

export const Order = models.Order || model<IOrderEX>("Order", OrderSchema);
