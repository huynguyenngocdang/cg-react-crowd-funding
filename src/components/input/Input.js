import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { ErrorBoundary, withErrorBoundary } from "react-error-boundary";

const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        className={`w-full px-6 py-4 text-sm font-medium border rounded-xl text-text1 placeholder:text-text4 dark:placeholder:text-text2 dark:text-white bg-transparent ${
          error.length > 0
            ? "border-error"
            : "border-strock dark:border-darkStroke"
        } ${children ? "pr-16" : ""}`}
        placeholder={error.length > 0 ? "" : placeholder}
        {...rest}
        {...field}
      />
      {error.length > 0 && (
        <span className="absolute text-sm font-medium text-error top-2/4 -translate-y-2/4 left-6 pointer-events-none error-input">
          {error}
        </span>
      )}
      {children && (
        <span className="absolute right-6 top-2/4 -translate-y-2/4 cursor-pointer select-none">
          {children}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
};

export default withErrorBoundary(Input, {
  FallbackComponent: <ErrorBoundary></ErrorBoundary>,
});
