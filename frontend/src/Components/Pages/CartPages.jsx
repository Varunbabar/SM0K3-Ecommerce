
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Men's sneakers
import black from "../../assets/Shoes/MenSneak/black.png";
import blue from "../../assets/Shoes/MenSneak/blue.png";
import green from "../../assets/Shoes/MenSneak/green.png";
import maroon from "../../assets/Shoes/MenSneak/maroon.png";

// Men's running shoes
import blackk from "../../assets/Shoes/MenRun/blackk.png";
import bluee from "../../assets/Shoes/MenRun/bluee.png";
import redd from "../../assets/Shoes/MenRun/redd.png";
import whitee from "../../assets/Shoes/MenRun/whitee.png";

// Women's sneakers
import beige from "../../assets/Shoes/WoSneak/beige.png";
import greenn from "../../assets/Shoes/WoSneak/greenn.png";
import pink from "../../assets/Shoes/WoSneak/pink.png";
import purple from "../../assets/Shoes/WoSneak/purple.png";
import pinkie from "../../assets/Shoes/WoSneak/pinkie.png";
import purplex from "../../assets/Shoes/WoSneak/purplex.png";

// Women's running shoes
import off from "../../assets/Shoes/WoRun/off.png";
import net from "../../assets/Shoes/WoRun/net.png";
import neon from "../../assets/Shoes/WoRun/neon.png";

const productImages = {
  4: black,
  5: blue,
  6: green,
  7: maroon,
  18: blackk,
  19: bluee,
  20: redd,
  21: whitee,
  8: pink,
  9: greenn,
  10: beige,
  11: purple,
  25: pinkie,
  26: purplex,
  22: off,
  23: net,
  24: neon,
};

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyItemId, setBusyItemId] = useState(null);

  const userId = localStorage.getItem("userId");

  const getToken = () => localStorage.getItem("token");

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();

      if (!token || !userId) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8081/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to load cart (HTTP ${response.status}).`
        );
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError(err.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;

    setError("");
    setBusyItemId(item.id);

    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8081/cart/item/${item.id}?quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to update quantity (HTTP ${response.status}).`
        );
      }

      await fetchCart();
    } catch (err) {
      console.error("Quantity update error:", err);
      setError(err.message || "Failed to update quantity.");
    } finally {
      setBusyItemId(null);
    }
  };

  const removeItem = async (cartItemId) => {
    setError("");
    setBusyItemId(cartItemId);

    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8081/cart/item/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to remove item (HTTP ${response.status}).`
        );
      }

      setCart((previousCart) => ({
        ...previousCart,
        cartItems: (previousCart?.cartItems ?? []).filter(
          (item) => item.id !== cartItemId
        ),
      }));
    } catch (err) {
      console.error("Remove item error:", err);
      setError(err.message || "Failed to remove item.");
    } finally {
      setBusyItemId(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  if (error && !cart) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="outlined" onClick={fetchCart}>
          Try Again
        </Button>
      </div>
    );
  }

  const items = cart?.cartItems ?? [];

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.product?.price ?? 0) *
        Number(item.quantity ?? 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-8">My Cart</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-500 mb-5">
            Your cart is empty.
          </h2>
          <Button variant="contained" onClick={() => navigate("/men")}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => {
              const price = Number(item.product?.price ?? 0);
              const quantity = Number(item.quantity ?? 0);
              const isBusy = busyItemId === item.id;
              const image =
                productImages[Number(item.product?.id)] ||
                item.product?.imageUrl;

              return (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-full sm:w-32 h-36 flex-shrink-0 overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        Image unavailable
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {item.product?.name ?? "Product unavailable"}
                    </h2>

                    <p className="text-gray-500">
                      Color: {item.product?.color ?? "N/A"}
                    </p>

                    <p>Size: UK {item.selectedSize}</p>

                    <p className="mt-1">
                      Price: ₹{price.toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <span>Quantity:</span>

                      <Button
                        size="small"
                        variant="outlined"
                        disabled={isBusy || quantity <= 1}
                        onClick={() =>
                          updateQuantity(item, quantity - 1)
                        }
                      >
                        −
                      </Button>

                      <span>{quantity}</span>

                      <Button
                        size="small"
                        variant="outlined"
                        disabled={isBusy || quantity >= 10}
                        onClick={() =>
                          updateQuantity(item, quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    <p className="font-semibold mt-3">
                      Subtotal: ₹
                      {(price * quantity).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <Button
                    variant="outlined"
                    color="error"
                    disabled={isBusy}
                    onClick={() => removeItem(item.id)}
                  >
                    {isBusy ? "Updating..." : "Remove"}
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="border-t mt-8 pt-5 flex flex-col items-end gap-4">
            <h2 className="text-2xl font-semibold">
              Total: ₹{total.toLocaleString("en-IN")}
            </h2>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
