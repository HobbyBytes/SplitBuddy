import React from "react";
import { Navbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import menu from "@/constants/menu";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Theme from "@/components/theme/Theme";
import { FaGithub } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import isAuthenticated from "@/utils/isAuthenticated";

function Header({
  showSidebar,
  setShowSidebar,
  className,
}: {
  showSidebar: boolean;
  setShowSidebar: Function;
  className: string;
}) {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isSigninPage = location.pathname.includes("signin");
  const isRegisterPage = location.pathname.includes("register");
  const isHomePage = location.pathname.includes("home");

  function handleSigninClick() {
    navigate("/signin");
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="text-gray-900 dark:text-gray-200 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menu.map((item) => (
        <li
          key={item.path}
          className="block px-0 py-1 font-normal leading-normal antialiased lg:px-1"
        >
          <NavLink
            className={`flex w-fit items-center`}
            title={item.title}
            to={item.path}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Navbar
        className={`${className} fixed border-0 top-0 z-10 h-max rounded-none py-2 px-6 lg:px-8 lg:py-4 opacity-100 backdrop-blur-lg transition-opacity dark:bg-gray-900 shadow-none dark:shadow-gray-900/40`}
        style={{
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="px-0 flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            {!isHomePage && !isRegisterPage && !isSigninPage && (
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => {
                  setShowSidebar((oldValue: boolean) => !oldValue);
                }}
                // onClick={() => setOpenNav(!openNav)}
              >
                {showSidebar ? (
                  <HiX className="h-6 w-6 text-gray-800 dark:text-gray-300" />
                ) : (
                  <HiOutlineMenu className="h-6 w-6 text-gray-800 dark:text-gray-300" />
                )}
              </IconButton>
            )}
            <NavLink
              to="/"
              className="mr-4 cursor-pointer py-1.5 font-semibold sm:text-xl dark:text-gray-200 text-black"
            >
              Split Buddy
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <a
              className="hidden sm:block"
              href="https://github.com/HobbyBytes"
              target="_blank"
            >
              <FaGithub className="h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-200" />
            </a>
            <Theme className="" />
            {!isRegisterPage && !isSigninPage && !isAuthenticated() && (
              <button
                className="tracking-wide select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle text-xs font-bold uppercase text-gray-100 shadow-sm shadow-blue-500/10  transition-all ease-in-out hover:shadow-sm hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleSigninClick}
              >
                Sign in
              </button>
            )}
            {isAuthenticated() && (
              <button
                className="tracking-wide select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle text-xs font-bold uppercase text-gray-100 shadow-sm shadow-blue-500/10  transition-all ease-in-out hover:shadow-sm hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => navigate("/signout")}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className="rounded-lg"
            >
              <span>Sign in</span>
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
