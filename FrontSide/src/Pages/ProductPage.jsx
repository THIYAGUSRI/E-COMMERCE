import { Button, Spinner, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ReviewSection from "../Component/ReviewSection";
import ProductCard from "../Component/ProductCard";

export default function ProductPage() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [moreProducts, setMoreProducts] = useState(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

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
        setProduct(data.products[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        const res = await fetch(`/api/product/getproducts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setMoreProducts(data.products);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMoreProducts();
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log({
      productId: product?._id,
      deliveryDate,
      additionalDetails,
    });
    setShowModal(false); // Close the modal
    setDeliveryDate(""); // Reset form
    setAdditionalDetails("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6 flex-col">
        <div className="bg-teal-50 p-8 rounded-lg shadow-lg max-w-5xl w-full flex flex-col md:flex-row items-start">
          <div className="md:w-1/3 w-full mb-4 md:mb-0">
            <img
              src={product && product.image}
              alt={product?.title || "Product Image"}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="md:w-2/3 w-full md:ml-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                {product && product.companyname}
              </h1>
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
            <h6 className="text-red-500 line-through text-sm mb-1">
              M.R.P:₹{product && product.previousprice}
            </h6>
            <h1 className="text-green-600 font-bold text-3xl mb-1">
              ₹{product && product.price}
            </h1>

            <div className="w-full mt-6">
              <div>
                <h1 className="font-bold">Description:</h1>
                <p className="text-gray-600">{product && product.content}</p>
              </div>
            </div>

            <Button
              className="px-4 py-2 rounded-lg mt-3 text-black text-3xl"
              gradientDuoTone="greenToBlue"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <ReviewSection productId={product?._id} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-5 w-2/4 m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {moreProducts &&
            moreProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Add to Cart</Modal.Header>
        <Modal.Body>
          <div>
            <Label htmlFor="deliveryDate">Delivery Date</Label>
            <TextInput
              id="deliveryDate"
              type="text"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Enter additional details about delivery"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={handleSubmit} gradientDuoTone='redToYellow'>Submit</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
