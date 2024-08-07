export default async function createOrder(
  e: React.FormEvent<HTMLFormElement>,
  status: string,
) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.append("status", status);
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
