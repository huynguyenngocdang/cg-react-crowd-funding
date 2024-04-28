import React from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { Link } from "react-router-dom";
import { Button, ButtonGoogle } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import * as yup from "yup";
import yupMessages from "constants/yupMessages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconEyeToggle } from "components/icons";
import useToggleValue from "hooks/useToggleValue";

const schema = yup.object({
  email: yup
    .string()
    .email(yupMessages.emailSyntax)
    .required(yupMessages.emailRequire),
  password: yup.string().required(yupMessages.passwordRequire),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSignIn = (values) => {
    console.log("🚀 ~ SignInPage ~ values:", values);
  };

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  return (
    <LayoutAuthentication heading="Welcome Back!">
      <p className="mb-6 text-xs font-medium text-center lg:font-normal lg:text-sm text-text3 lg:mb-8">
        Don't have an account?{" "}
        <Link to="/sign-up" className="font-medium underline text-primary">
          Sign up
        </Link>
        <ButtonGoogle text="Sign in with Google"></ButtonGoogle>
      </p>
      <form onSubmit={handleSubmit(handleSignIn)}>
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
        <FormGroup>
          <div className="text-right">
            <span className="inline-block text-sm font-medium text-primary">
              Forgot Password
            </span>
          </div>
        </FormGroup>
        <Button type="submit" className="w-full bg-primary">
          Sign in
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
