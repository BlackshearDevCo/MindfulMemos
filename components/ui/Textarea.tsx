import React from "react";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    placeholder: string;
    label: string;
  };

export default function Textarea({ label, name, ...props }: TextareaProps) {
  return (
    <label htmlFor={name}>
      <p className="mb-1">{label}</p>
      <textarea
        rows={3}
        name={name}
        {...props}
        className="bg-black/20 px-3 py-1 rounded w-full resize-y min-h-8"
      />
    </label>
  );
}
