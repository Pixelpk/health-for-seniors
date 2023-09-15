/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Button, Navbar } from "flowbite-react";
import type { FC } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router";
import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";

const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();
  const navigate = useNavigate();

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt1 className="h-6 w-6" />
                )}
              </button>
            )}
            <Navbar.Brand href="/">
              <img
                alt=""
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-8"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Flowbite
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3 ">
            <span className="relative inline-flex items-center p-0 text-sm font-medium text-center">
              <FaUserGroup className="w-7 h-7" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                20
              </div>
            </span>
            <span className="relative inline-flex items-center p-0 text-sm font-medium text-center">
              <MdEmail className="w-7  h-7 " />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                20
              </div>
            </span>
            <div className="flex items-center">
              <Button
                color="primary"
                outline
                onClick={() => navigate("/drive")}
              >
                Live Drive
              </Button>
            </div>
            <div className="hidden lg:block">
              <Avatar
                alt=""
                img="../images/users/neil-sims.png"
                rounded
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

// const UserDropdown: FC = function () {
//   return (
//     <Dropdown
//       arrowIcon={false}
//       inline
//       label={
//         <span>
//           <span className="sr-only">User menu</span>
//           <Avatar
//             alt=""
//             img="../images/users/neil-sims.png"
//             rounded
//             size="sm"
//           />
//         </span>
//       }
//     >
//       <Dropdown.Header>
//         <span className="block text-sm">Neil Sims</span>
//         <span className="block truncate text-sm font-medium">
//           neil.sims@flowbite.com
//         </span>
//       </Dropdown.Header>
//       <Dropdown.Item>Dashboard</Dropdown.Item>
//       <Dropdown.Item>Settings</Dropdown.Item>
//       <Dropdown.Item>Earnings</Dropdown.Item>
//       <Dropdown.Divider />
//       <Dropdown.Item>Sign out</Dropdown.Item>
//     </Dropdown>
//   );
// };

export default ExampleNavbar;
