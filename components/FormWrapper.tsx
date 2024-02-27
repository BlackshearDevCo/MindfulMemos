import React from "react";

export default function FormWrapper({
  action,
  children,
}: {
  action: (formData: FormData, param?: any) => Promise<any>;
  children: React.ReactNode;
}) {
  return (
    <form action={action} className="flex flex-col items-start gap-3">
      {children}
    </form>
  );
}
