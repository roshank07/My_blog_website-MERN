import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import {
  toggleTheme,
} from "../redux/theme/themeSlice";
import {
  signOutUserSuccess,
} from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const result = await fetch(`/api/user/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      if (result.ok) {
        dispatch(signOutUserSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleOutlineSearch = () => {
    navigate(`/search`);
  };

  return (
    <Navbar className="border-b-2 bg-gray-900 text-white">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 rounded-lg text-white">
          Void
        </span>{" "}
        Writes
      </Link>
      <form onSubmit={handleSubmit} className="ml-4">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline bg-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-10 ml-4 lg:hidden"
        color="gray"
        pill
        onClick={handleOutlineSearch}
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 items-center">
        <Button
          className="w-12 h-10 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                @{currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">
            <div className={`hover:cursor-pointer ${path === "/" ? 'border-b-2 border-blue-400' : ''} text-white`}>Home</div>
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">
            <div className={`hover:cursor-pointer ${path === "/about" ? 'border-b-2 border-blue-400' : ''} text-white`}>About</div>
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/portfolio"} as={"div"}>
          <Link to="/portfolio">
            <div className={`hover:cursor-pointer ${path === "/portfolio" ? 'border-b-2 border-blue-400' : ''} text-white`}>Portfolio</div>
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
