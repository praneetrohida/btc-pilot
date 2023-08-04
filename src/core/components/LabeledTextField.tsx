import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@mantine/core";

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();

    return (
      <Input.Wrapper {...outerProps}>
        <Input.Label {...labelProps}>{label}</Input.Label>
        <Input disabled={isSubmitting} {...register(name)} {...(props as any)} />

        <ErrorMessage
          render={({ message }) => <Input.Error>{message}</Input.Error>}
          errors={errors}
          name={name}
        />

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
          }
          input {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
          }
        `}</style>
      </Input.Wrapper>
    );
  }
);

export default LabeledTextField;
