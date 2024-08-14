import { IButtons } from "@/components/form/form";

export default async function createOrder(
  e: React.FormEvent<HTMLFormElement>,
  buttons: IButtons,
) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  for (const element in buttons) {
    formData.append(element, buttons[element as keyof IButtons]);
  }

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
  } catch (error) {
    console.log(error);
  }
}
