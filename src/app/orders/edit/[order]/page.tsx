"use client";
import EditForm from "@/components/form/editForm";
import Loader from "@/components/shared/loader";
import { useGetOrderById } from "@/hooks/useGetOrderById";

const Page = ({ params }: { params: { order: string } }) => {
  const { data: order, isFetching } = useGetOrderById(params.order);

  if (isFetching) return <Loader />;

  if (order) return <EditForm order={order} />;
};

export default Page;
