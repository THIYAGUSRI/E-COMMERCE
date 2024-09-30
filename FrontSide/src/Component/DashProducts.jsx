import { Table } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function DashProducts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product/getproducts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserProducts(data.products);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (currentUser?.role === "buyer") {
      fetchProducts();
    }
  }, [currentUser]);

  return (
    <div className="p-4 w-full">
      {currentUser?.role === "buyer" && userProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <Table hoverable className="w-full border-collapse">
            <Table.Head className="bg-transparent">
              <Table.HeadCell className='bg-gray-600 text-white'>Date Updated</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Post Image</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Post Title</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Category</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Delete</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border border-b-3">
              {userProducts.map((product) => (
                <Table.Row key={product._id} className="bg-transparent">
                  <Table.Cell>{new Date(product.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.title}
                      className="w-20 h-10 object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>{product.category}</Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500 cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-blue-500 cursor-pointer">Edit</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
