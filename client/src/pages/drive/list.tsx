/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Pagination as FBPagination,
  Label,
  Modal,
  Progress,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { FC, useContext, useEffect, useState } from "react";
import { FcFile, FcFolder } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineExclamationCircle,
  HiSearch,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import axios from "axios";
import moment from "moment";
import { FaPlus } from "react-icons/fa6";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { baseURL } from "../../constants";
import { readFiles } from "../../services/file-storage";
import { FileSharingContext } from "../../context/FileSharingContext";

const DriveListPage: FC = function () {
  const { userInfo } = useContext(FileSharingContext);
  const [prefix, setPrefix] = useState("/");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["drive"],
    queryFn: () => readFiles(userInfo?.["ID"], prefix, searchQuery),
  });

  useEffect(() => {
    refetch();
  }, [prefix, userInfo, searchQuery]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="flex items-center justify-between divide-x divide-gray-100 dark:divide-gray-700 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl capitalize">
            {userInfo?.["name"]}
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
        <div className="flex w-full items-center justify-between">
          <h6 className="text-lg font-semibold text-gray-900 dark:text-white capitalize flex items-center gap-2 ">
            {prefix !== "/" && (
              <FiArrowLeft
                className="cursor-pointer"
                onClick={() => setPrefix("/")}
              />
            )}
            {userInfo?.["name"]} Folder
          </h6>
          <div className="flex items-center justify-end gap-2">
            <CreateFolderModal prefix={prefix} />
            <UploadFileModal prefix={prefix} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <AllUsersTable
                  contents={data ?? []}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  setPrefix={setPrefix}
                  prefix={prefix}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </NavbarSidebarLayout>
  );
};

const AllUsersTable: FC<{
  contents: any;
  setPrefix: any;
  prefix: String;
  isFetching: Boolean;
  isLoading: Boolean;
}> = function ({ contents, setPrefix, prefix, isFetching, isLoading }) {
  const { userInfo } = useContext(FileSharingContext);
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = async (key: String) => {
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: import.meta.env["VITE_AWS_ACCESS_KEY_ID"],
        secretAccessKey: import.meta.env["VITE_AWS_SECRET_ACCESS_KEY"],
      },
    });

    const bucketName = "healthforseniors-drive";
    const objectKey = `${key}`;
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    try {
      const signedUrl = await getSignedUrl(client, command, {
        expiresIn: 3600,
      });
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error generating signed URL:", error);
    }
  };
  const handleRemove = async (key: String) => {
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: import.meta.env["VITE_AWS_ACCESS_KEY_ID"],
        secretAccessKey: import.meta.env["VITE_AWS_SECRET_ACCESS_KEY"],
      },
    });

    const bucketName = "healthforseniors-drive";
    const objectKey = `${key}`;

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });

    try {
      setIsRemoving(true);
      await client.send(deleteCommand);

      await axios.post(
        baseURL + `remove-file?userID=${userInfo?.["ID"]}&filePath=${key}`
      );

      queryClient.invalidateQueries({ queryKey: ["drive"] });
      setOpen(false);
      setIsRemoving(false);
    } catch (error) {
      console.error("Error generating signed URL:", error);
      setIsRemoving(false);
    }
  };

  return (
    <>
      {isLoading || isFetching ? (
        <div className="text-center p-2">
          <Spinner color={"success"} size={"xl"} />
        </div>
      ) : (
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell>File Name</Table.HeadCell>
            <Table.HeadCell>Creation Date</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {contents.map((content: any) => (
              <Table.Row
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  if (!Boolean(content.file_path)) {
                    setPrefix(prefix + content.name);
                  }
                }}
              >
                <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0 cursor-pointer">
                  <div className="flex text-sm text-gray-500 dark:text-gray-400 gap-3 items-center">
                    {Boolean(content.file_path) ? (
                      <FcFile className="w-7 h-7" />
                    ) : (
                      <FcFolder className="w-7 h-7" />
                    )}
                    <span>{content.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {moment(content?.creation_date).format("DD MMM YYYY")}
                  </div>
                </Table.Cell>

                <Table.Cell className="flex gap-2">
                  {Boolean(content.file_path) && (
                    <div
                      className="flex items-center gap-x-3 whitespace-nowrap"
                      onClick={() => handleClick(content.file_path)}
                    >
                      <Button color="primary">View</Button>
                    </div>
                  )}
                  {Boolean(content.file_path) && (
                    <div className="flex items-center gap-x-3 whitespace-nowrap">
                      <DeleteModal
                        handleRemove={handleRemove}
                        contentKey={content.file_path}
                        isOpen={isOpen}
                        setOpen={setOpen}
                        isRemoving={isRemoving}
                      />
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
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

const UploadFileModal: FC<{
  prefix: String;
}> = function ({ prefix }) {
  const [isOpen, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const queryClient = useQueryClient();
  const { userInfo } = useContext(FileSharingContext);

  const handleUpload = async (event: any) => {
    const file = event.target.files;
    const selectedFile = file[0];
    if (file && file.length > 0) {
      setSelectedFile(file[0]);
    }
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: import.meta.env["VITE_AWS_ACCESS_KEY_ID"],
        secretAccessKey: import.meta.env["VITE_AWS_SECRET_ACCESS_KEY"],
      },
    });

    const d = moment();
    const objectKey =
      userInfo?.["ID"] + "_" + d.unix() + "_" + selectedFile.name;

    const command = new PutObjectCommand({
      Bucket: "healthforseniors-drive",
      Key: objectKey,
      Body: selectedFile,
    });

    try {
      const signedUrl = await getSignedUrl(client, command, {
        expiresIn: 3600,
      });

      await axios.put(signedUrl, selectedFile, {
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(percentCompleted);
        },
      });
      await axios.post(baseURL + "update-file-record", {
        file_path: objectKey,
        parent_folder: prefix,
        user_id: userInfo?.["ID"],
        creation_date: d.toISOString(),
        name: selectedFile.name,
      });

      setOpen(false);
      setSelectedFile(null);
      setUploadProgress(0);
      queryClient.invalidateQueries({ queryKey: ["drive"] });
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Upload file
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Upload File</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2 gap-1">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </div>
                <div className="my-3 flex justify-between">
                  <div className="text-sm font-medium">
                    {selectedFile && selectedFile.name}
                  </div>
                  <div className="text-sm font-medium">{uploadProgress}%</div>
                </div>
                <Progress progress={uploadProgress} color="dark" />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CreateFolderModal: FC<{
  prefix: String;
}> = function ({ prefix }) {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, seIstLoading] = useState(false);
  const { userInfo } = useContext(FileSharingContext);
  const [folderName, setFolderName] = useState<String | "">("");
  const queryClient = useQueryClient();

  const createFolder = async (folderName: String) => {
    const currentTime = moment();
    seIstLoading(true);
    axios
      .post(baseURL + "update-file-record", {
        file_path: "",
        parent_folder: prefix,
        user_id: userInfo?.["ID"],
        creation_date: currentTime.toISOString(),
        name: folderName,
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["drive"] });
        setOpen(false);
        seIstLoading(false);
      });
  };

  return (
    <>
      <Button color="light" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Create Folder
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size={"md"}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Create Folder</strong>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFolder(folderName);
          }}
        >
          <Modal.Body>
            <TextInput
              id="folder"
              placeholder="add folder name"
              required
              size={32}
              type="text"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button color="primary" disabled={isLoading} type="submit">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

const DeleteModal: FC<{
  contentKey: any;
  handleRemove: any;
  setOpen: any;
  isOpen: Boolean;
  isRemoving: Boolean;
}> = function ({ contentKey, handleRemove, isOpen, setOpen, isRemoving }) {
  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
          Delete file
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pb-0 pt-6">
          <span className="sr-only">Delete file</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this file?
            </p>
            <div className="flex items-center gap-x-3">
              <Button
                color="failure"
                disabled={isRemoving}
                onClick={() => handleRemove(contentKey)}
              >
                Confirm
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DriveListPage;
