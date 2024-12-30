import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react";

export default function Order() {
  const [userOrders, setUserOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/order/getOrders/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserOrders(data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser._id) {
      fetchOrders();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = [];
      try {
        for (const order of userOrders) {
          const res = await fetch(
            `/api/product/getproducts?productId=${order.productId}`
          );
          if (res.ok) {
            const data = await res.json();
            products.push(data.product);
          } else {
            console.error(
              `Failed to fetch product with productId: ${order.productId}`
            );
            products.push({
              title: "Unknown Product",
              image: "",
              _id: order.productId,
              price: 0,
            });
          }
        }
        setUserProducts(products);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    if (userOrders.length > 0) {
      fetchProducts();
    }
  }, [userOrders]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  if (error) {
    return <p>Error loading orders: {error}</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {userOrders.map((order) => {
        const product = userProducts.find(
          (prod) => prod._id === order.productId
        );
        return (
          <div
            key={order._id}
            className=" shadow-md rounded-lg p-2 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => openModal({ order, product })}
          >
            <img
              src={product?.image || "/placeholder-image.png"}
              alt={product?.title || "Unknown Product"}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800">{product?.title || "Unknown Product"}</h3>
            <p className="text-gray-600">Price: {product?.price || "N/A"}</p>
          </div>
        );
      })}

      {/* Modal */}
      {modalOpen && selectedOrder && (
        <Modal show={modalOpen} onClose={closeModal}>
          <Modal.Header>Order Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <img
                  src={selectedOrder.product?.image || "/placeholder-image.png"}
                  alt={selectedOrder.product?.title || "Unknown Product"}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </div>
              <h3 className="text-lg font-bold">
                {selectedOrder.product?.title || "Unknown Product"}
              </h3>
              <p>Price: {selectedOrder.product?.price || "N/A"}</p>
              <p>Quantity: {selectedOrder.order?.quantity}</p>
              <p>Total Amount: {selectedOrder.order?.totalamount}</p>
              <p>Balance Amount: {selectedOrder.order?.balanceamount}</p>
              <p>Paid Status: {selectedOrder.order?.paidstatus}</p>
              <p>Delivery Status: {selectedOrder.order?.deliverystatus}</p>
              <p>
                Ordered Date:{" "}
                {new Date(selectedOrder.order?.createdAt).toLocaleDateString()}
              </p>
              <p>Delivery Date: {selectedOrder.order?.date || "N/A"}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
