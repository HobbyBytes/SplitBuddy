import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/Logo";

// import { SearchModalContext } from "../../context/searchModalContext";
// import SearchButton from "../search/SearchButton";

import ThemeToggle from "@/components/theme/ThemeToggle";
import menu from "@/constants/menu";
import MobileSidebar from "../sidebar/MobileSidebar";

function Header() {
  // add close on click outside
  const [openNav, setOpenNav] = useState(false);
  // const { openSearchModal } = useContext(SearchModalContext);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 dark:text-gray-50 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menu.map((item) => (
        <li
          key={item.path}
          className="block py-1 font-normal leading-normal antialiased lg:px-1"
        >
          <NavLink
            className={`flex w-fit items-center`}
            title={item.title}
            to={item.path}
            onClick={() => {
              if (openNav) setOpenNav(!openNav);
            }}
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
        className="sticky top-0 z-10 h-max max-w-full rounded-none border-0 px-6 py-2 text-lg opacity-100 backdrop-blur-lg transition-opacity dark:bg-black/75 dark:shadow-gray-900/40 lg:px-8 lg:py-4"
        style={{
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="relative flex items-center justify-between text-black">
          <div className="flex flex-row gap-2">
            <MobileSidebar className={`lg:hidden`} />
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <ThemeToggle />
            <Button size="sm" className="hidden lg:inline-block">
              <span>Sign in</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-6 w-6 text-inherit dark:text-gray-50 sm:h-8 sm:w-8 lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <HiX className="h-6 w-6 text-gray-800 dark:text-gray-300 sm:h-8 sm:w-8" />
              ) : (
                <HiOutlineMenu className="h-6 w-6 text-gray-800 dark:text-gray-300 sm:h-8 sm:w-8" />
              )}
            </Button>
          </div>
        </div>
        <Collapse className="text-black dark:text-gray-50" open={openNav}>
          {navList}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
