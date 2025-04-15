import { connectDB } from "@/db";
import Order, { IOrder, IOrderEX } from "@/models/order.model";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

// get all orders
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const status = req.nextUrl.searchParams.get("status");
    const orders = await Order.find({ status: status });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`error: ${error}`, { status: 500 });
  }
}

// create order
export async function POST(req: NextRequest) {
  try {
    const body: IOrder = await req.json();

    await connectDB();

    const order: IOrderEX = new Order({
      createdAt: moment().tz("Europe/Kyiv").format("DD.MM HH:mm"),
      status: body.status,
      type: body.type,
      deliveryType: body.deliveryType,

      order_num: body.order_num,
      datetime: body.datetime,
      user: body.user,
      tool: body.tool,
      cost_delivery: body.cost_delivery,
      cost_rental: body.cost_rental,
      cost_deposit: body.cost_deposit,
      address: body.address,
      coords: body.coords,
      phone: body.phone,
      comment: body.comment,
    } as IOrderEX);

    await order.save();

    return NextResponse.json({ created: order }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
