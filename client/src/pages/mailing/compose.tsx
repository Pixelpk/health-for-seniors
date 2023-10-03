/* eslint-disable jsx-a11y/anchor-is-valid */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, HelperText, Label, TextInput } from "flowbite-react";
import { useContext, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select/creatable";
import * as yup from "yup";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { sendEmail } from "../../services/email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

const schema = yup.object().shape({
  recipient: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .email("Please add valid email address")
          .required("Email address is required"),
      })
    )
    .min(1, "Please select at least one recipient")
    .required("Recipient is required"),
  subject: yup.string().required("Subject is required"),
  text: yup.string().required("Text is required"),
});

const MailingComposePage: FC = function () {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { userInfo } = useContext(UserContext);
  const onSubmit = async (data: any) => {
    const emailRecipients = data.recipient.map((rec: any) => rec.value);
    sendEmail({
      recipients: emailRecipients,
      subject: data.subject,
      emailText: data.text,
    })
      .then(() => {
        toast.success("Email Sent !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <ToastContainer />
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 py-6 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="flex items-center justify-between divide-x divide-gray-100 dark:divide-gray-700 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl capitalize">
            {userInfo?.["data"][0]?.name}
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {moment().format("DD MMMM YYYY")}
            </p>
          </h1>
        </div>
      </div>
      <Card className="m-5">
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-700">
            <div className="flex space-x-2 pl-4 text-gray-500">New Email</div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bottom-0 right-0 bg-white p-4 pt-8 dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="mb-4 space-y-4 lg:mb-5 lg:pl-4">
            <div>
              <Controller
                name="recipient"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[]}
                    placeholder="add recipients"
                    isMulti
                    isClearable
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.recipient && (
                <HelperText color={"failure"}>
                  {errors.recipient.message}
                </HelperText>
              )}
            </div>
            <div>
              <Label
                htmlFor="subject"
                color={errors.subject?.message ? "failure" : "gray"}
                className="sr-only"
              >
                Subject
              </Label>
              <TextInput {...register("subject")} placeholder="Subject" />
              <HelperText color={"failure"}>
                {errors.subject?.message}
              </HelperText>
            </div>
            <div className="h-80">
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                    className="h-3/4 md:h-3/4"
                    theme="snow"
                    placeholder="Write email text..."
                  />
                )}
              />
            </div>
          </div>
          <div className="items-center dark:divide-gray-700 flex sm:divide-x sm:divide-gray-100 lg:pl-4 justify-end">
            <div className="mb-3 space-y-3 sm:mb-0 sm:flex sm:space-y-0 ">
              <Button color="primary" type="submit" disabled={isSubmitting}>
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
