export default async function deleteOrder(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/orders/delete-order`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const ok = await res.json();

    return ok;
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
