import React from "react";
import {
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { FaUser, FaGear, FaPowerOff, FaMagnifyingGlass } from "react-icons/fa6";

function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: any;
}) {
  const [open, setOpen] = React.useState(0);
  const sidebarClass = showSidebar ? "ml-0" : "-ml-80 lg:ml-0";

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const SideBarList = () => {
    return (
      <List className="px-0 dark:text-gray-200 font-intervariable ">
        {/* <hr className="my-2 border-blue-gray-50 dark:border-blue-gray-800" /> */}
        <ListItem className="rounded-lg dark:hover:bg-blue-gray-800 dark:focus:bg-blue-gray-800 dark:active:bg-blue-gray-800 dark:hover:text-blue-gray-100 dark:focus:text-blue-gray-100">
          <ListItemPrefix>
            <FaUser className="h-5 w-5 text-gray-900 dark:text-gray-300" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="rounded-lg dark:hover:bg-blue-gray-800 dark:focus:bg-blue-gray-800 dark:active:bg-blue-gray-800 dark:hover:text-blue-gray-100 dark:focus:text-blue-gray-100">
          <ListItemPrefix>
            <FaGear className="h-5 w-5 text-gray-900 dark:text-gray-300" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="rounded-lg dark:hover:bg-blue-gray-800 dark:focus:bg-blue-gray-800 dark:active:bg-blue-gray-800 dark:hover:text-blue-gray-100 dark:focus:text-blue-gray-100">
          <ListItemPrefix>
            <FaPowerOff className="h-5 w-5 text-gray-900 dark:text-gray-300" />
          </ListItemPrefix>
          Sign Out
        </ListItem>
      </List>
    );
  };

  const ModalOverlay = () => (
    <div
      className={`flex lg:hidden fixed mt-[52px] lg:mt-[70px] top-0 right-0 bottom-0 left-0 bg-gray-800/25 opacity-100 backdrop-blur-lg transition-opacity`}
      style={{
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={(oldValue) => {
        setShowSidebar(!oldValue);
      }}
    />
  );

  return (
    <Card className="font-intervariable">
      {/* lg:mb-[56px] */}
      <div
        className={`${sidebarClass} bg-white/90 dark:bg-black/90 mt-[52px] lg:mt-[70px] lg:mb-[56px] w-80 py-4 px-6 lg:px-8 rounded-none shadow-none transition-[margin-left] ease-in-out duration-500 fixed top-0 bottom-0 left-0 lg:left-auto z-10 opacity-100 backdrop-blur-3xl`}
      >
        <Input
          icon={<FaMagnifyingGlass className="h-4 w-4" />}
          label="Search"
        />
        <SideBarList />
      </div>
      {showSidebar ? <ModalOverlay /> : <></>}
    </Card>
  );
}

export default Sidebar;
