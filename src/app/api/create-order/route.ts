import { connectDB } from "@/db";
import { IOrderEX, Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const order: IOrderEX = new Order({
      status: body.status,
      datetime: body.datetime,
      order: body.order,
      tool: body.tool,
      cost: body.cost,
      address: body.address,
      coords: body.coords,
      phone: body.phone,
      comment: body.comment,
      isDone: false,
    });

    await order.save();

    return NextResponse.json("body");
  } catch (error) {
    console.log(error);
    return NextResponse.json(`error: ${error}`);
  }
}
