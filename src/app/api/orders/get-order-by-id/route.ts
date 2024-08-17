import { connectDB } from "@/db";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    const order = await Order.findOne({ _id: id });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json(`error: ${error}`);
  }
}
