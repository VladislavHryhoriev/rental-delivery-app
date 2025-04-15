import { connectDB } from "@/db";
import Order, { IOrder } from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

// get order by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<IOrder | { error: string }>> {
  try {
    await connectDB();
    const order = await Order.findOne({ _id: params.id });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

// update order
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

    return NextResponse.json({ updated: updatedOrder }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

// delete order
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<{ deleted: IOrder } | { error: string }>> {
  try {
    await connectDB();

    const order = await Order.findOneAndDelete({ _id: params.id });

    return NextResponse.json({ deleted: order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
