"use client";

import { useUser } from "@/lib/hooks";
import { getUsersInitials } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function UserImage() {
  const user = useUser();
  const userInitials = getUsersInitials(user);

  return (
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background-100">
      {user?.image ? (
        <Image src={user.image} alt="Profile Image" width={64} height={64} />
      ) : (
        <span className="text-2xl font-bold">{userInitials}</span>
      )}
    </div>
  );
}
