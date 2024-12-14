import { Navbar, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
            dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <Navbar className="border-b-2 px-4 lg:px-8 relative">
      <Navbar.Brand href="/"> 
        <div className="flex items-center text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            THIYAGU
          </span>
        </div>
      </Navbar.Brand>

      {/* Links and Search Bar Section */}
      <div className="flex flex-grow gap-4 justify-center items-center">
        <div className="hidden lg:flex items-center max-w-md relative">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </form>
          <AiOutlineSearch className="absolute inset-y-0 right-3 my-auto text-gray-500" />
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`hidden lg:block px-3 py-2 ${pathname === '/' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hidden lg:block px-3 py-2 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
          >
            About
          </Link>
          <Link
            to="/userslist"
            className={`hidden lg:block px-3 py-2 ${pathname === '/userslist' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-500`}
          >
            Userslist
          </Link>
        </div>
      </div>

      {/* Mobile Search Button */}
      <Link to="/search">
        <Button className="lg:hidden mr-4" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </Link>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} rounded className='h-10 w-10' />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="relative inline-block px-4 py-2 text-transparent bg-transparent rounded-full overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 group-hover:text-white transition duration-300 ease-in-out">
                Sign In
              </span>
              <span className="absolute inset-0 bg-white rounded-full m-1 group-hover:bg-transparent transition duration-300 ease-in-out"></span>
            </Button>
          </Link>
        )}

        {/* Navbar Toggle */}
        <Navbar.Toggle className="lg:hidden w-full border-b-2 border-gray-300" />
      </div>

      {/* Navbar Collapse for Links (dropdown below toggle) */}
      <Navbar.Collapse className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg mt-2 rounded-b-lg z-10">
        <div className="w-full flex flex-col items-start">
          <Link
            to="/"
            className={`block w-full text-left px-4 py-2 border-b border-gray-200 ${pathname === '/' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block w-full text-left px-4 py-2 border-b border-gray-200 ${pathname === '/about' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
          >
            About
          </Link>
          <Link
            to="/userslist"
            className={`block w-full text-left px-4 py-2 border-b border-gray-200 ${pathname === '/userslist' ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-500`}
          >
            UsersList
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};


