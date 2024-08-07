import { connectDB } from "@/db";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    await connectDB();

    const order = await Order.findOneAndUpdate({ _id: id }, { status });

    return NextResponse.json({ updated: order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
