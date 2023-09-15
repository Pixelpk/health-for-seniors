/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Button, Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { BiSolidContact, BiSolidHome } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { FaCalendarDays, FaInbox, FaUserGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { useNavigate } from "react-router";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/e-commerce/"));
  }, [setCurrentPage, setEcommerceOpen]);

  return (
    <div
      className={classNames("lg:!block", {
        hidden: !isSidebarOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isSidebarOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Collapse
                  icon={FaCalendarDays}
                  label="Calender"
                  open={isEcommerceOpen}
                ></Sidebar.Collapse>
                <Sidebar.Item
                  href="/contacts"
                  icon={BiSolidContact}
                  className={
                    "/contacts" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Contacts
                </Sidebar.Item>
                <Sidebar.Collapse
                  icon={FaUserGroup}
                  label="Customers"
                  open={isEcommerceOpen}
                ></Sidebar.Collapse>
                <Sidebar.Item icon={BiSolidHome}>Dashboard</Sidebar.Item>
                <Sidebar.Collapse
                  icon={FaInbox}
                  label="Emails"
                  open={isEcommerceOpen}
                >
                  <Sidebar.Item
                    href="/mailing/compose"
                    icon={FaEdit}
                    className={
                      "/mailing/compose" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Compose
                  </Sidebar.Item>
                </Sidebar.Collapse>

                {/* <Sidebar.Collapse
                  icon={HiUsers}
                  label="Users"
                  open={isUsersOpen}
                >
                  <Sidebar.Item
                    href="/users/list"
                    className={
                      "/users/list" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Users list
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/profile"
                    className={
                      "/users/profile" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Profile
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/feed"
                    className={
                      "/users/feed" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Feed
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/users/settings"
                    className={
                      "/users/settings" === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    Settings
                  </Sidebar.Item>
                </Sidebar.Collapse> */}
                {/* <Sidebar.Collapse icon={HiChartSquareBar} label="Pages">
                  <Sidebar.Item href="/pages/pricing">Pricing</Sidebar.Item>
                  <Sidebar.Item href="/pages/maintenance">
                    Maintenace
                  </Sidebar.Item>
                  <Sidebar.Item href="/pages/404">404 not found</Sidebar.Item>
                  <Sidebar.Item href="/pages/500">
                    500 server error
                  </Sidebar.Item>
                </Sidebar.Collapse> */}
                {/* <Sidebar.Collapse icon={HiLockClosed} label="Authentication">
                  <Sidebar.Item href="/authentication/sign-in">
                    Sign in
                  </Sidebar.Item>
                  </Sidebar.Collapse> */}
                {/* <Sidebar.Item href="/authentication/sign-up">
                    Sign up
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/forgot-password">
                    Forgot password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/reset-password">
                    Reset password
                  </Sidebar.Item>
                  <Sidebar.Item href="/authentication/profile-lock">
                    Profile lock
                  </Sidebar.Item> */}
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item>Hierarchy Setup</Sidebar.Item>
                <Sidebar.Item>Employee Setup</Sidebar.Item>
                <Sidebar.Item>Database Setup</Sidebar.Item>
                <Sidebar.Item>Permission Setup</Sidebar.Item>
                <Sidebar.Item>Reports Setup</Sidebar.Item>
                <Sidebar.Item>Dashboard Setup</Sidebar.Item>
                <Sidebar.Item>Callcenter Setup</Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          <Button
            color="light"
            onClick={() => navigate("/authentication/sign-in")}
          >
            <LuLogOut className="mr-2 h-5 w-5" />
            <p>Logout</p>
          </Button>
        </div>
      </Sidebar>
    </div>
  );
};

export default ExampleSidebar;
