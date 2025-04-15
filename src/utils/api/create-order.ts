import { IButtons, IFormData } from "@/components/form/form";

export default async function createOrder(
  inputValues: IFormData,
  buttons: IButtons,
) {
  const data = {
    ...buttons,
    ...Object.fromEntries(
      Object.entries(inputValues).map(([key, value]) => [key, value.value]),
    ),
  };

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
