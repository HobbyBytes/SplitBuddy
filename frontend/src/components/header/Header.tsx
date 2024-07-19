import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import menu from "@/constants/menu";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import ThemeToggle from "../theme/ThemeToggle";

function Header({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Function;
}) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="text-gray-900 dark:text-gray-50 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
        className="fixed border-0 top-0 z-10 h-max rounded-none py-2 px-6 lg:px-8 lg:py-4 opacity-100 backdrop-blur-lg transition-opacity dark:bg-gray-900 shadow-none dark:shadow-gray-900/40"
        style={{
          WebkitBackdropFilter: "blur(16px)",
          width: "-webkit-fill-available",
        }}
      >
        <div className="px-0 flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => {
                console.log(`Clicked the icon`);
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
            <NavLink
              to="/"
              className="mr-4 cursor-pointer py-1.5 font-medium dark:text-gray-100 text-black"
            >
              Split Buddy
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <ThemeToggle />
            <div className="flex items-center gap-x-1">
              {/* <Button
                variant="gradient"
                size="sm"
                className="rounded-[0.5rem] bg-gray-900 dark:bg-gray-50"
              >
                <span>Sign in</span>
              </Button> */}
              <button
                className="select-none rounded-[0.5rem] bg-gray-900 dark:bg-gray-100 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white dark:text-gray-900 shadow-md shadow-gray-900/10 dark:shadow-gray-50/10 transition-all ease-in-out hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-gray-100/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className="rounded-[0.5rem]"
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