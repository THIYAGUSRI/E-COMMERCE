import { useState, useEffect } from 'react';
import { Label, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function UserLists() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount.

  return (
    <div className="p-4 w-full">
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <Table hoverable className="w-full border-collapse">
            <Table.Head className="bg-transparent">
              <Table.HeadCell className="bg-gray-600 text-white">Date Created</Table.HeadCell>
              <Table.HeadCell className="bg-gray-600 text-white">User Image</Table.HeadCell>
              <Table.HeadCell className="bg-gray-600 text-white">User Name</Table.HeadCell>
              <Table.HeadCell className="bg-gray-600 text-white">Seller / Buyer</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border border-b-3">
              {users.map((user) => (
                <Table.Row key={user._id} className="bg-transparent">
                  <Table.Cell className="text-black">{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture || 'https://via.placeholder.com/150'}
                      alt={user.username}
                      className="w-14 h-15 object-cover rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/detail/${user._id}`} className="text-2xl text-black flex items-center">
                      {user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {user.role === 'seller' ? (
                      <Label className="text-xl">Seller</Label>
                    ) : (
                      <Label className="text-xl">Buyer</Label>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>No Users Yet!</p>
      )}
    </div>
  );
}
