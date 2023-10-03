/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Button, Sidebar } from "flowbite-react";
import { FC, useContext } from "react";
import { useEffect, useState } from "react";
import { BiSolidContact, BiSolidHome } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { FaCalendarDays, FaInbox, FaUserGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

import { useSidebarContext } from "../context/SidebarContext";
import { UserContext } from "../context/UserContext";
import isSmallScreen from "../helpers/is-small-screen";
import { useNavigate } from "react-router";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const [isEcommerceOpen, setEcommerceOpen] = useState(true);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setEcommerceOpen(newPage.includes("/mailing/"));
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
          <Sidebar.Items className="mt-4 mb-4">
            <Sidebar.ItemGroup>
              <Button
                className="w-full"
                color="light"
                onClick={() => {
                  setUserInfo(null);
                  navigate("/authentication/sign-in");
                }}
              >
                <LuLogOut className="mr-2 h-5 w-5" />
                {!isSidebarOpenOnSmallScreens && <p>Logout</p>}
              </Button>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </Sidebar>
    </div>
  );
};

export default ExampleSidebar;
