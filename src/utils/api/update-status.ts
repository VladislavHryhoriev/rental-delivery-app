export default async function updateStatus(
  id: string,
  status: "process" | "completed",
) {
  try {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const ok = await res.json();

    return ok;
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
}
