import { connectDB } from "@/db";
import Order, { IOrderEX } from "@/models/order.model";
import moment from "moment-timezone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectDB();

    const order: IOrderEX = new Order({
      createdAt: moment().tz("Europe/Kyiv").format("DD.MM HH:mm"),
      status: body.status,
      datetime: body.datetime,
      order: body.order,
      tool: body.tool,
      cost: body.cost,
      address: body.address,
      coords: body.coords,
      phone: body.phone,
      comment: body.comment,
    });

    await order.save();

    return NextResponse.json({ created: order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
