import React from 'react'
import { Label, Table } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';


export default function UserLists() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUsers();
  });
  return (
    <div className="p-4 w-full">
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <Table hoverable className="w-full border-collapse">
            <Table.Head className="bg-transparent">
              <Table.HeadCell className='bg-gray-600 text-white'>Date Created</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>user Image</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>user name</Table.HeadCell>
              <Table.HeadCell className='bg-gray-600 text-white'>Seller / Buyer</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y border border-b-3">
              {users.map((user) => (
                <Table.Row key={user._id} className="bg-transparent">
                  <Table.Cell className='text-black'>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture || 'https://via.placeholder.com/150'}
                      alt={user.username}
                      className="w-14 h-15 object-cover rounded-full"
                    />
                  </Table.Cell>
                  <Link to={`/detail/${user._id}`}><Table.Cell className='text-2xl text-black flex items-center'>{user.username}</Table.Cell>
                  </Link> 
                  <Table.Cell>
                    {user.role=='seller' ? (
                      <div>
                        <Label className='text-xl'>Seller</Label>
                      </div>
                      
                    ) : (
                      <div>
                        <Label className='text-xl'>Buyer</Label>
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p>No Users Not yet!</p>
      )}
    </div>
  );
}
