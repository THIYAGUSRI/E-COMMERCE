import React, { useEffect, useState } from 'react';
import ProductCard from '../Component/ProductCard';
import { Carousel } from "flowbite-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/product/getProducts');
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-8 shadow-md mb-8">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Our Featured Products
        </h1>
        <p className="text-white text-center mt-2 text-lg">
          Explore the best products handpicked just for you!
        </p>
      </header>

      <div>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full">
          <Carousel>
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.google.com/imgres?imgurl=https://us.123rf.com/450wm/yupiramos/yupiramos1503/yupiramos150303159/37306550-delivery-design-over-blue-background-vector-illustration.jpg?ver%3D6&tbnid=fd0C1_A8E3idTM&vet=1&imgrefurl=https://www.123rf.com/clipart-vector/supply_chain_management.html&docid=4cQM4DZizWgXLM&w=450&h=450&itg=1&hl=en_GB&source=sh/x/im/m5/5&kgs=12a2d2fc160b367e"
                alt="Product 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.google.com/imgres?imgurl=https://us.123rf.com/450wm/yupiramos/yupiramos1503/yupiramos150303159/37306550-delivery-design-over-blue-background-vector-illustration.jpg?ver%3D6&tbnid=fd0C1_A8E3idTM&vet=1&imgrefurl=https://www.123rf.com/clipart-vector/supply_chain_management.html&docid=4cQM4DZizWgXLM&w=450&h=450&itg=1&hl=en_GB&source=sh/x/im/m5/5&kgs=12a2d2fc160b367e"
                alt="Product 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.google.com/imgres?imgurl=https://us.123rf.com/450wm/yupiramos/yupiramos1503/yupiramos150303159/37306550-delivery-design-over-blue-background-vector-illustration.jpg?ver%3D6&tbnid=fd0C1_A8E3idTM&vet=1&imgrefurl=https://www.123rf.com/clipart-vector/supply_chain_management.html&docid=4cQM4DZizWgXLM&w=450&h=450&itg=1&hl=en_GB&source=sh/x/im/m5/5&kgs=12a2d2fc160b367e"
                alt="Product 3"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.google.com/imgres?imgurl=https://us.123rf.com/450wm/yupiramos/yupiramos1503/yupiramos150303159/37306550-delivery-design-over-blue-background-vector-illustration.jpg?ver%3D6&tbnid=fd0C1_A8E3idTM&vet=1&imgrefurl=https://www.123rf.com/clipart-vector/supply_chain_management.html&docid=4cQM4DZizWgXLM&w=450&h=450&itg=1&hl=en_GB&source=sh/x/im/m5/5&kgs=12a2d2fc160b367e"
                alt="Product 4"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.google.com/imgres?imgurl=https://us.123rf.com/450wm/yupiramos/yupiramos1503/yupiramos150303159/37306550-delivery-design-over-blue-background-vector-illustration.jpg?ver%3D6&tbnid=fd0C1_A8E3idTM&vet=1&imgrefurl=https://www.123rf.com/clipart-vector/supply_chain_management.html&docid=4cQM4DZizWgXLM&w=450&h=450&itg=1&hl=en_GB&source=sh/x/im/m5/5&kgs=12a2d2fc160b367e"
                alt="Product 5"
                className="object-cover w-full h-full"
              />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Product Grid */}
      {products && products.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-700 text-xl font-semibold">
            No products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
