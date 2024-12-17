import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import heart icons
import ReviewSection from '../Component/ReviewSection';
import ProductCard from '../Component/ProductCard';

export default function ProductPage() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false); // State to manage heart icon toggle
  const [moreProducts, setMoreProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/getproducts?slug=${productSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setProduct(data.products[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);


  useEffect(() => {
    try {
      const fetchMoreProducts = async () => {
        const res = await fetch(`/api/product/getproducts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setMoreProducts(data.products);
        }
      };
      fetchMoreProducts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  // Function to toggle like (heart icon)
  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6 flex-col">
      {/* Main Container with Background and Padding */}
      <div className="bg-teal-50 p-8 rounded-lg shadow-lg max-w-5xl w-full flex flex-col md:flex-row items-start">
        {/* Left side: Image */}
        <div className="md:w-1/3 w-full mb-4 md:mb-0">
          <img
            src={product && product.image}
            alt={product?.title || 'Product Image'}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right side: Product Information */}
        <div className="md:w-2/3 w-full md:ml-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {product && product.companyname}
            </h1>
            {/* Heart Icon */}
            <div
              className="cursor-pointer text-red-500 text-2xl"
              onClick={toggleLike}
            >
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          </div>
          <h1 className="text-2xl font-medium text-gray-700 mb-2">
            {product && product.title}
          </h1>
          <h1 className="text-xl text-gray-500 mb-2">
            {product && product.category}
          </h1>
          <h6 className="text-red-500 line-through text-sm mb-1">
            M.R.P:₹{product && product.previousprice}
          </h6>
          <h1 className="text-green-600 font-bold text-3xl mb-1">
            ₹{product && product.price}
          </h1>
          <h1 className="mb-4 text-gray-700 mt-1 text-2xl">
            Stock: {product && product.stock}
          </h1>

          {/* Downside Content */}
          <div className="w-full mt-6">
            <div>
              <h1 className="font-bold">Description:</h1>
              <p className="text-gray-600">{product && product.content}</p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className='flex justify-between flex-col sm:flex-row'>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3">
            Add to Cart
          </Button>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3">
            Add to WistList
          </Button>
          </div>
          <div className='flex items-center justify-center'>
          {product && product._id && <ReviewSection productId={product._id} />}
          </div>
        </div>
      </div>
    </div>
    <div className='flex flex-col justify-center items-center mb-5 w-2/4 m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
          {moreProducts && moreProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </>
  );
}
