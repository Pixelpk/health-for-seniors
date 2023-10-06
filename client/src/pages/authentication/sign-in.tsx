/* eslint-disable jsx-a11y/anchor-is-valid */
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../services/auth";
import { HiInformationCircle } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import { readContacts } from "../../services/contact";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

interface FormData {
  email: string;
  password: string;
}

const SignInPage: FC = function () {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIsError, setIsError] = useState("");
  const { setUserInfo } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    login(data)
      .then(async () => {
        const users = await readContacts();

        users.data.filter(
          (user: any) => user.email.toLowerCase() === data.email.toLowerCase()
        );
        setUserInfo({
          data: users.data.filter(
            (user: any) => user.email.toLowerCase() === data.email.toLowerCase()
          ),
          email: data.email,
        });
        setIsSubmitting(false);
        navigate("/");
      })
      .catch((err) => {
        setIsError(err.response.data.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="w-full md:max-w-[600px] md:[&>*]:w-full md:[&>*]:p-5 ">
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isIsError && (
            <div className="mb-4">
              <Alert color="failure" icon={HiInformationCircle}>
                <span>
                  <p>{isIsError}</p>
                </span>
              </Alert>
            </div>
          )}
          <div className="mb-4 flex flex-col gap-y-1">
            <Label
              htmlFor="email"
              color={errors.email?.message ? "failure" : "gray"}
            >
              Your email
            </Label>
            <TextInput
              color={errors.email?.message ? "failure" : "gray"}
              helperText={errors.email?.message}
              {...register("email")}
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-1">
            <Label
              htmlFor="password"
              color={errors.password?.message ? "failure" : "gray"}
            >
              Your password
            </Label>
            <TextInput
              color={errors.password?.message ? "failure" : "gray"}
              helperText={errors.password?.message}
              {...register("password")}
              placeholder="••••••••"
              type="password"
            />
          </div>

          <div className="mb-6">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
