"use client";

import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, onClose, title }: Props) {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-4/5 max-w-sm min-h-16 rounded bg-background shadow-md p-4">
          {title && (
            <Dialog.Title className="text-2xl font-medium mb-3">
              {title}
            </Dialog.Title>
          )}

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export function ModalRoute(props: Omit<Props, "onClose">) {
  const router = useRouter();

  return <Modal {...props} onClose={() => router.back()} />;
}
