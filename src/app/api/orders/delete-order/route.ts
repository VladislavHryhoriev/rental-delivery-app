import { connectDB } from "@/db";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await connectDB();

    const order = await Order.findOneAndDelete({ _id: id });

    return NextResponse.json({ deleted: order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
