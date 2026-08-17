import { useParams } from "react-router-dom";
import { allProduct } from "../../Data/Shoes/allProduct";
import { Button } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const product = allProduct.find((item) => item.id === Number(id));
  if (!product) {
    return <h1>Product Not Found</h1>;
  }
  return (
    <div className="max-w-7xl mx-auto p-10 grid grid-cols-2 gap-12">
      <div>
        <img src={product.image} alt={product.name} className="w-full " />
      </div>
      <div>
        <div className="text-gray-500 text-xl">
          <h2>{product.brand}</h2>
        </div>
        <div className="text-3xl font-semibold mt-2">
          <h1>{product.name}</h1>
        </div>
        <div className="text-xl mt-2">
          Description- Crafted by skilled Kargir (कारीगर), blending timeless
          craftsmanship with modern streetwear style.
        </div>
        
        <div className="text-2xl text-black-600 font-semibold mt-4">
          <h2> ₹ {product.price.toLocaleString()}</h2>
        </div>
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-6">
          <p className="font-bold">Limited Time Deal !</p>

          <p>Get it at ₹4,399 using SM0K3 coupon.</p>
        </div>
        <div className="pt-8 text-xl">
          Select Size-
          <div className="flex gap-2">
            {product.sizes.map((size)=>(
            <Button variant="outlined">UK {size}</Button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-10">
          <Button variant="outlined" color="secondary" size="large">
            Add to Cart
          </Button>

          <Button variant="outlined" color="primary" size="large">
            Buy Now
          </Button>
        </div>
        <div className="bg-gray-100 border border-gray-300 rounded-lg mt-12 p-4">
          <p className="">- Free 7-day returns and exchanges</p>
          <p className="">- Delivey in 3-5 days</p>
          <p className="">- Free shipping</p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
