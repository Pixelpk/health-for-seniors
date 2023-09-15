/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  Pagination as FBPagination,
  Label,
  Table,
  TextInput,
} from "flowbite-react";
import { FC, useState } from "react";
import { FcFolder } from "react-icons/fc";
import { HiChevronLeft, HiChevronRight, HiSearch } from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const DriveListPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="flex items-center justify-between divide-x divide-gray-100 dark:divide-gray-700 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Neil Sims
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              Monday, March 22, 2023
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
            />
          </form>
        </div>
      </div>
      <Card className="m-5">
        <h6 className="text-lg font-semibold text-gray-900 dark:text-white ">
          My Folder
        </h6>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <AllUsersTable />
              </div>
            </div>
          </div>
        </div>
        <Pagination />
      </Card>
    </NavbarSidebarLayout>
  );
};

const AllUsersTable: FC = function () {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>File Name</Table.HeadCell>
        <Table.HeadCell>Created Date</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
            <div className="flex font-semibold text-gray-500 dark:text-gray-400 gap-3 items-center">
              <FcFolder className="w-7 h-7" />
              <span>Neil Sims</span>
            </div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              20 Aug 2023
            </div>
          </Table.Cell>

          <Table.Cell>
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <Button color="primary">View</Button>
            </div>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export const Pagination: FC = function () {
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
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <FBPagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalPages={100}
        />
      </div>
    </div>
  );
};

export default DriveListPage;
