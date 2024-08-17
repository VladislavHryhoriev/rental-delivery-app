import { IButtons } from "@/components/form/form";

export default async function updateOrder(
  id: string,
  e: React.FormEvent<HTMLFormElement>,
  buttons: IButtons,
) {
  const formData = new FormData(e.currentTarget);
  formData.append("_id", id);

  for (const element in buttons) {
    formData.append(element, buttons[element as keyof IButtons]);
  }

  const data = Object.fromEntries(formData);

  try {
    const res = await fetch("/api/orders/update-order", {
      method: "PUT",
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
