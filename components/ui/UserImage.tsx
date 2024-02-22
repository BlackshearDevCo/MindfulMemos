"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React from "react";

export default function UserImage() {
  const { user } = useUser();

  return (
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background-100">
      {user?.picture ? (
        <Image src={user.picture} alt="Profile Image" width={64} height={64} />
      ) : (
        <span className="text-2xl font-bold">BB</span>
      )}
    </div>
  );
}
