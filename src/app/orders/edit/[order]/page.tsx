"use client";
import EditForm from "@/components/form/editForm";
import Empty from "@/components/shared/empty";
import Loader from "@/components/shared/loader";
import { useGetOrderById } from "@/hooks/useGetOrderById";

const Page = ({ params }: { params: { order: string } }) => {
  const { data: order, isFetching, isLoading } = useGetOrderById(params.order);

  if (isFetching || isLoading) return <Loader />;
  if (order) return <EditForm order={order} />;

  return <Empty title="Замовлення не знайдено" />;
};

export default Page;
