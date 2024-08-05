"use client";

import Form from "@/components/form/form";
import { useState } from "react";

const Page = () => {
  const [status, setStatus] = useState("process");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("status", status);
    formData.append("isDone", "false");
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      console.log(json);
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-center">Створити нову доставку</h1>
      <Form handleSubmit={handleSubmit} status={status} setStatus={setStatus} />
    </>
  );
};

export default Page;
