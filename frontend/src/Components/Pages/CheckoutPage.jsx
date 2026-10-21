
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    if (!/^[0-9]{10}$/.test(address.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(address.pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8081/orders/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          responseText || `Order failed (HTTP ${response.status}).`
        );
      }

      let order = null;

      if (responseText) {
        try {
          order = JSON.parse(responseText);
        } catch {
          order = null;
        }
      }

      if (order === null) {
        setError("Order response was empty or invalid. Check your orders before trying again.");
        return;
      }

      navigate("/orders");
    } catch (err) {
      setError(err.message || "Unable to place your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-semibold mb-2">Checkout</h1>

      <p className="text-gray-500 mb-8">
        Enter your delivery details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          fullWidth
          required
          label="Full Name"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          required
          label="Phone Number"
          name="phone"
          type="tel"
          value={address.phone}
          onChange={handleChange}
          inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
          helperText="Enter your 10-digit mobile number"
        />

        <TextField
          fullWidth
          required
          label="Address"
          name="addressLine"
          value={address.addressLine}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            fullWidth
            required
            label="City"
            name="city"
            value={address.city}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            required
            label="PIN Code"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            inputProps={{ maxLength: 6, pattern: "[0-9]{6}" }}
          />
        </div>

        {error && (
          <p className="text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            variant="outlined"
            onClick={() => navigate("/cart")}
            disabled={loading}
          >
            Back to Cart
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
