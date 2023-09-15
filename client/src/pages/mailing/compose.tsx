/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import type { FC } from "react";
import { HiArrowRight, HiSearch } from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const MailingComposePage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 py-6 dark:border-gray-700 dark:bg-gray-800 sm:flex">
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
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
            <div className="flex space-x-2 pl-4 text-gray-500">New Email</div>
          </div>
        </div>
        <form className="bottom-0 right-0 bg-white p-4 pt-8 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 space-y-4 lg:mb-5 lg:pl-4">
            <div>
              <Label htmlFor="message-to" className="sr-only">
                To
              </Label>
              <TextInput id="message-to" name="message-to" placeholder="To" />
            </div>
            <div>
              <Label htmlFor="message-subject" className="sr-only">
                Subject
              </Label>
              <TextInput
                id="message-subject"
                name="message-subject"
                placeholder="Subject"
              />
            </div>
            <div>
              <Label htmlFor="reply-mail" className="sr-only">
                Your message
              </Label>
              <Textarea
                id="reply-mail"
                name="reply-mail"
                placeholder="Write text here ..."
                rows={24}
              />
            </div>
          </div>
          <div className="items-center dark:divide-gray-700 sm:flex sm:divide-x sm:divide-gray-100 lg:pl-4 justify-end">
            <div className="mb-3 space-y-3 sm:mb-0 sm:flex sm:space-y-0 ">
              <Button color="primary" type="submit">
                <div className="flex items-center gap-x-2">
                  Send <HiArrowRight className="text-lg" />
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </NavbarSidebarLayout>
  );
};

export default MailingComposePage;
