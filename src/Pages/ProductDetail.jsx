import API from "@/API/Interceptor";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Wallet, ArrowLeft } from "lucide-react";

/* ---------------------------------------
   Helper function to create product detail
------------------------------------------ */
const createProductDetail = (product) => {
  return [
    { label: "Category", value: product.category },
    { label: "Stock Available", value: `${product.stock} units` },
    {
      label: "About this Product",
      value: product.description || "No description available.",
    },
    {
      label: "Quality Promise",
      value:
        "Each product goes through a 3-step quality check to ensure premium durability, design, and performance before it reaches your hands.",
    },
  ];
};

const ProductDetail = () => {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductByID = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProductData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductByID();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!productData)
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  const productDetails = createProductDetail(productData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-16 px-4 flex items-center justify-center relative">
      {/* 🔙 Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-black bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
      >
        <div className="grid md:grid-cols-2 gap-10 p-10">
          {/* 🖼️ Image Section */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center bg-gray-50 rounded-2xl shadow-inner"
          >
            <img
              src={productData.image}
              alt={productData.name}
              className="rounded-2xl w-[90%] object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* 🧾 Product Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                {productData.name}
              </h1>
              <p className="text-gray-500 italic text-sm">
                "Redefining quality and design — built for those who demand
                perfection."
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-semibold text-gray-900">
                ₹{productData.price}
              </span>
              <span
                className={`text-sm px-4 py-1 rounded-full ${
                  productData.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {productData.stock > 0
                  ? `In Stock (${productData.stock})`
                  : "Out of Stock"}
              </span>
            </div>

            {/* 📋 Render Details */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              {productDetails.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-400 text-sm uppercase">
                    {item.label}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* 🛒 Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                size="lg"
                className="w-full sm:w-1/2 bg-black hover:bg-gray-800 text-white rounded-xl py-6 text-lg flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                className="w-full sm:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-6 text-lg flex items-center justify-center gap-2 shadow-md"
              >
                <Wallet className="w-5 h-5" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* 💬 Brand Content Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-10 py-8 border-t border-gray-200 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Why Choose Our Products?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At <span className="font-semibold text-gray-900">ADA Hustlers</span>
            , every product is crafted to deliver a perfect balance of
            technology, performance, and design. Whether it’s a gadget, a book,
            or an accessory — you don’t just buy a product, you buy an
            experience.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;