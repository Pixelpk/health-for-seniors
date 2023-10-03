/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
  Button,
  Card,
  Pagination as FBPagination,
  Label,
  Table,
  TextInput,
} from "flowbite-react";
import { FC, useContext, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiSearch } from "react-icons/hi";
import { ImFilesEmpty } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { readContacts } from "../../services/contact";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import { filter } from "lodash";
import { FileSharingContext } from "../../context/FileSharingContext";

interface Contact {
  name: string;
  email: string;
  recentActivity: string;
}

const ContactsListPage: FC = function () {
  const { userInfo } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: readContacts,
  });

  function applySortFilter(array, query) {
    if (query) {
      return filter(array, (data) => {
        const values = Object.values(data);
        return values.some(
          (val) =>
            (typeof val === "string" || typeof val === "number") &&
            val.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }
    return array;
  }
  const filteredData = applySortFilter(data?.data ?? [], searchQuery);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="flex items-center justify-between divide-x divide-gray-100 dark:divide-gray-700 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl capitalize">
            {userInfo?.["data"][0]?.name}
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {moment().format("DD MMMM YYYY")}
            </p>
          </h1>
          <form>
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <TextInput
              icon={HiSearch}
              id="search"
              name="search"
              placeholder="Search"
              required
              size={32}
              type="search"
              onChange={(e: any) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
      <Card className="m-5">
        <h6 className="text-lg font-semibold text-gray-900 dark:text-white ">
          Contacts
        </h6>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <AllUsersTable contacts={filteredData ?? []} />
              </div>
            </div>
          </div>
        </div>
        {/* <Pagination contacts={data?.data ?? []} /> */}
      </Card>
    </NavbarSidebarLayout>
  );
};

const AllUsersTable: FC<{ contacts: Contact[] }> = function ({ contacts }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { setUserInfo } = useContext(FileSharingContext);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Creation Date</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {contacts
          .filter(
            (contact: any) =>
              contact.email.toLowerCase() !== userInfo?.["email"].toLowerCase()
          )
          .map((user) => (
            <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <Avatar rounded />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  20 Aug 2023
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <Button
                    color="primary"
                    onClick={() => {
                      setUserInfo(user);
                      navigate({ pathname: "/drive" });
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <ImFilesEmpty className="text-lg" />
                      View Files
                    </div>
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export const Pagination: FC<{ contacts: Contact[] }> = function ({ contacts }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {contacts.length}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <FBPagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalPages={contacts.length}
        />
      </div>
    </div>
  );
};

export default ContactsListPage;
