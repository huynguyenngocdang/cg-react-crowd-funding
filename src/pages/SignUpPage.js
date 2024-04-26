import { Button } from "components/button";
import { Checkbox } from "components/checkbox";
import { IconEyeToggle } from "components/icons";
import { Input } from "components/input";
import { Label } from "components/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "components/common/FormGroup";
import LayoutAuthentication from "layout/LayoutAuthentication";
import React from "react";
import useToggleValue from "hooks/useToggleValue";
import yupMessages from "constants/yupMessages";

const schema = yup.object({
  name: yup.string().required(yupMessages.nameRequire),
  email: yup
    .string()
    .email(yupMessages.emailSyntax)
    .required(yupMessages.emailRequire),
  password: yup.string().required(yupMessages.passwordRequire),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSignUp = (values) => {
    console.log("🚀 ~ SignUpPage ~ values:", values);
  };

  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  // const [acceptTerm, setAcceptTerm] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const handleToogleTerm = () => {
  //   setAcceptTerm(!acceptTerm);
  // };
  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword);
  // };
  console.log(errors);
  return (
    <LayoutAuthentication heading="SignUp">
      <p className="mb-6 text-xs lg:font-normal font-medium text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-medium underline text-primary">
          Sign in
        </Link>
      </p>
      <button className="flex items-center justify-center w-full py-4 mb-5 text-base font-semibold border gap-x-3 border-strock rounded-xl text-text2 dark:text-white dark:border-darkStroke">
        <img srcSet="/icon-google.png 2x" alt="icon-google" />
        <span>Sign up with Google</span>
      </button>
      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white">
        Or sign up with email
      </p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            control={control}
            name="name"
            placeholder="John Doe"
            error={errors.name?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="create a password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <div className="flex items-start p-2 mb-5 gap-x-5">
          <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
            <p className="flex-1 text-xs lg:text-sm font-normal text-text2 dark:text-text3">
              I agree to the{" "}
              <span className="underline text-secondary">Terms of Use</span> and
              have read and understand the{" "}
              <span className="underline text-secondary">Privacy policy</span>
            </p>
          </Checkbox>
          {/* <span className="inline-block w-5 h-5 border rounded border-text4"></span> */}
        </div>
        <Button type="submit" className="w-full bg-primary">
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
