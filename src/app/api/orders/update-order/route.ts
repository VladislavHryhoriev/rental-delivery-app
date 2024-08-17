import { connectDB } from "@/db";
import Order, { IOrder } from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const order: IOrder = await req.json();

    await connectDB();

    console.log(order);

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order._id },
      { ...order },
      { new: true },
    );

    return NextResponse.json({ updated: updatedOrder });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
