export default async function updateStatus(
  id: string,
  status: "process" | "completed",
) {
  try {
    const res = await fetch(`${process.env.API_URL}/orders/update-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    const ok = await res.json();

    return ok;
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
