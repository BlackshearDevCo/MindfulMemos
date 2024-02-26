import clsx from "clsx";
import React from "react";

type ButtonVariant = "primaryAccentGradient";

type ButtonProps = {
  children: React.ReactNode;
  variant: ButtonVariant;
};

export default function Button({ children, variant }: ButtonProps) {
  return (
    <button
      className={clsx(
        "mx-auto w-auto rounded-full px-5 py-2",
        getButtonStyleClasses(variant),
      )}
    >
      {children}
    </button>
  );
}

const getButtonStyleClasses = (variant: ButtonVariant) => {
  return clsx(
    variant === "primaryAccentGradient" &&
      "text-text-50 font-bold bg-gradient-to-r from-primary-400 to-secondary-400",
  );
};
