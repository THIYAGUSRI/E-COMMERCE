import React, { useEffect, useState } from 'react';
import ProductCard from '../Component/ProductCard';

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
      {/* Page Header */}
      <header className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-8 shadow-md mb-8">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Our Featured Products
        </h1>
        <p className="text-white text-center mt-2 text-lg">
          Explore the best products handpicked just for you!
        </p>
      </header>

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
