"use client";
import EditForm from "@/components/form/editForm";
import { IOrder } from "@/models/order.model";
import getOrderById from "@/utils/api/get-order-by-id";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Page = ({ params }: { params: { order: string } }) => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const order = await getOrderById(params.order);
      setOrder(order);
      setIsFetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return (
      <div className="mt-8 flex justify-center">
        <BeatLoader color="#991b1b" />
      </div>
    );
  }

  if (order) {
    return <EditForm order={order} />;
  }
};

export default Page;
