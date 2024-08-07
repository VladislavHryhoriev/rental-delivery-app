import { connectDB } from "@/db";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status");

    await connectDB();

    const orders = await Order.find({ status: status });

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(`error: ${error}`);
  }
}
