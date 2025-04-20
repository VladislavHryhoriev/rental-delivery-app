import { redirect } from "next/navigation";

const NotFound = () => {
  redirect("/orders/process");
};

export default NotFound;
