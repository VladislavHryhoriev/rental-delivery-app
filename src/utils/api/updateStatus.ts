export default async function getAllOrders(status: "process" | "completed") {
  try {
    const response = await fetch(
      `${process.env.API_URL}/orders/update-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({}),
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
