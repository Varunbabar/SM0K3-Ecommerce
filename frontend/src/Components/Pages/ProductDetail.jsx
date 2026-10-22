
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
import pinkie from "../../assets/Shoes/WoSneak/pinkie.png";
import purple from "../../assets/Shoes/WoSneak/purple.png";
import purplex from "../../assets/Shoes/WoSneak/purplex.png";

// Women's running shoes
import neon from "../../assets/Shoes/WoRun/neon.png";
import net from "../../assets/Shoes/WoRun/net.png";
import off from "../../assets/Shoes/WoRun/off.png";

// Drop sneakers
import velvet from "../../assets/Shoes/CollabSneak/Velvet.png";
import red from "../../assets/Shoes/CollabSneak/Red.png";
import Green from "../../assets/Shoes/CollabSneak/Green.png";

//Lace
import redLace from "../../assets/Laces/redLace.png";
import skinLace from "../../assets/Laces/skinLace.png";
import blackLace from "../../assets/Laces/blackLace.png";


const productImages = {
  4: green,    // Olive Green
  5: blue,     // Ocean BLue
  6: maroon,   // Lava Red
  7: black,    // Shadow Black (men's sneakers)

  8: pink,     // Baby Pink
  9: greenn,   // Leaves Green
  10: beige,   // Sand Beige
  11: purple,  // BlackCurrant Purple

  12: Green,   // Shrub Green
  13: velvet,  // Milkyway
  14: red,     // Red Velvet

  15: redLace,   // Red laces
  16: skinLace,  // Blue laces
  17: blackLace, // Beige laces

  18: blackk,  // Shadow Black (men's running)
  19: bluee,   // Mist BLue
  20: redd,    // Blood Red
  21: whitee,  // Air White

  22: off,     // Coral
  23: net,     // Net
  24: neon,    // Neon
  25: pinkie,  // Rose Pink
  26: purplex, // Wakanda
};


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [addingToCart, setAddingToCart] = useState(false);

  const showNotification = (message, type = "success") => {
    setNotification(message);
    setNotificationType(type);

    // Clear the notification after three seconds.
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  useEffect(() => {
    setProduct(null);
    setSelectedSize(null);
    setQuantity(1);

    fetch(`http://localhost:8081/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct(null);
      });
  }, [id]);

 
const handleAddToCart = async () => {
  if (selectedSize === null) {
    showNotification("Please select a shoe size.", "error");
    return;
  }

  const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

if (!token || !userId) {
  navigate("/login");
  return;
}

  setAddingToCart(true);

  try {
    const response = await fetch(
  `http://localhost:8081/cart/${userId}/add/${id}?size=${selectedSize}&quantity=${quantity}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed: ${response.status}`);
    }

    showNotification("Added to cart successfully!");
  } catch (error) {
    console.error("Add to cart error:", error);
    showNotification(
      error.message || "Could not add product to cart.",
      "error"
    );
  } finally {
    setAddingToCart(false);
  }
};


  if (!product) {
    return (
      <h1 className="text-center mt-10">
        Loading product...
      </h1>
    );
  }

  const image = productImages[Number(id)] || product.imageUrl;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

      {/* Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 top-20 z-50 rounded-lg px-6 py-3 text-white shadow-lg ${
            notificationType === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {notification}
        </div>
      )}

      {/* Product Image */}
      <div>
        <div className="w-full h-[350px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-contain scale-125"
            />
          ) : (
            <p className="text-gray-500">Image unavailable</p>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div>
        <p className="text-gray-500 text-xl">
          {product.color}
        </p>

        <h1 className="text-3xl font-semibold mt-2">
          {product.name}
        </h1>

        {product.description && (
          <p className="text-xl mt-4">
            {product.description}
          </p>
        )}

        <p className="text-2xl text-black font-semibold mt-4">
          ₹ {Number(product.price).toLocaleString("en-IN")}
        </p>

        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-6">
          <p className="font-bold">Limited Time Deal!</p>
          <p>Get it at ₹4,399 using SM0K3 coupon.</p>
        </div>

        {/* Shoe Sizes */}
        <div className="pt-8 text-xl">
          <p>Select Size</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {product.sizes?.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                UK {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Quantity and Purchase Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <span className="text-base">Quantity:</span>

            <Button
              variant="outlined"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </Button>

            <span className="min-w-6 text-center">
              {quantity}
            </span>

            <Button
              variant="outlined"
              disabled={quantity >= 10}
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => {
              alert("Buy Now will be connected to checkout next.");
            }}
          >
            Buy Now
          </Button>
        </div>

        {/* Delivery Information */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg mt-10 p-4">
          <p>Free 7-day returns and exchanges</p>
          <p>Delivery in 3–5 days</p>
          <p>Free shipping</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
