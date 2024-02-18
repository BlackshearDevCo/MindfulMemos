import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  label: React.ReactNode;
};

export default function Input({ name, label, ...props }: InputProps) {
  return (
    <label htmlFor={name}>
      <p className="mb-1">{label}</p>
      <input
        id={name}
        name={name}
        type="text"
        {...props}
        className="bg-black/20 px-3 py-1 rounded w-full"
      />
    </label>
  );
}
