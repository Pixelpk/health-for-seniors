/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, TextInput } from "flowbite-react";
import { FC } from "react";
import { useNavigate } from "react-router";

const SignInPage: FC = function () {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="w-full md:max-w-[600px] md:[&>*]:w-full md:[&>*]:p-5 ">
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </div>

          <div className="mb-6">
            <Button
              type="submit"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
