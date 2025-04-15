import { connectDB } from "@/db";
import Order, { IOrder } from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

// update status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<{ updated: IOrder } | { error: string }>> {
  try {
    await connectDB();

    const { status } = await req.json();
    const order = await Order.findOneAndUpdate({ _id: params.id }, { status });

    return NextResponse.json({ updated: order });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
