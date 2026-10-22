
import React, { useEffect, useState } from "react";
import FilterDrawer from "../Filter/FilterDrawer";
import HomeSectionCard from "../HomeCarousel/HomeSectionCardl";
import PromoBar from "../PromoBar/PromoBar";
import SortBy from "../Sort/SortBy";

import beige from "../../assets/Shoes/WoSneak/beige.png";
import green from "../../assets/Shoes/WoSneak/greenn.png";
import pink from "../../assets/Shoes/WoSneak/pink.png";
import pinkie from "../../assets/Shoes/WoSneak/pinkie.png";
import purple from "../../assets/Shoes/WoSneak/purple.png";
import purplex from "../../assets/Shoes/WoSneak/purplex.png";

import neon from "../../assets/Shoes/WoRun/neon.png";
import net from "../../assets/Shoes/WoRun/net.png";
import off from "../../assets/Shoes/WoRun/off.png";

const WomenPage = () => {
  const [products, setProducts] = useState([]);

  const sneakerImages = {
    8: pink,
    9: green,
    10: beige,
    11: purple,
    25: pinkie,
    26: purplex,
  };

  const runningImages = {
    22: off,
    23: net,
    24: neon,
  };

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch women's products");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Products received:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching women's products:", error);
      });
  }, []);

  const sneakers = products.filter(
    (product) => product.category === "Women Sneakers"
  );

  const runningShoes = products.filter(
    (product) => product.category === "Women Running"
  );

  return (
    <div>
      <div className="pt-4 pl-4 text-2xl text-center">
        <h1>WOMEN FOOTWEAR</h1>
      </div>

      <PromoBar />

      <div className="flex justify-between items-center py-4 px-2">
        <SortBy />
        <FilterDrawer
          underPrice="Under 3999"
          midPrice="4000-7999"
          highPrice="Above 8000"
        />
      </div>

      <section className="py-4">
        <h2 className="text-2xl text-center font-semibold">
          Women Sneakers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {sneakers.map((product) => (
            <HomeSectionCard
              key={product.id}
              product={{
                ...product,
                image:
                  sneakerImages[Number(product.id)] ||
                  product.imageUrl,
              }}
            />
          ))}
        </div>

        {sneakers.length === 0 && (
          <p className="text-center py-4">No sneakers found.</p>
        )}
      </section>

      <section className="py-4">
        <h2 className="text-2xl text-center font-semibold">
          Women Running Shoes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {runningShoes.map((product) => (
            <HomeSectionCard
              key={product.id}
              product={{
                ...product,
                image:
                  runningImages[Number(product.id)] ||
                  product.imageUrl,
              }}
            />
          ))}
        </div>

        {runningShoes.length === 0 && (
          <p className="text-center py-4">No running shoes found.</p>
        )}
      </section>
    </div>
  );
};

export default WomenPage;
