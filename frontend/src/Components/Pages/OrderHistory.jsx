import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8081";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load orders.");
        }
        return response.json();
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading your orders...</p>;

  if (error) {
    return <p className="p-6">{error}</p>;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <section
              key={order.id}
              className="rounded-lg border p-5"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h2 className="font-semibold">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : "Date unavailable"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </p>
                  <p className="text-sm">{order.status}</p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="mb-2 font-medium">Items</h3>

                {(order.orderItems || []).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 py-1"
                  >
                    <span>
                      {item.product?.name || "Product"}{" "}
                      × {item.quantity}
                      {item.selectedSize != null
                        ? ` (Size ${item.selectedSize})`
                        : ""}
                    </span>

                    <span>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <p>
                  Deliver to: {order.fullName || "—"}
                </p>
                <p>
                  {[
                    order.addressLine,
                    order.city,
                    order.state,
                    order.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
