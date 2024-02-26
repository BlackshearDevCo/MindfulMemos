"use client";

import { useUser } from "@/lib/hooks/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import React from "react";
import { getUsersInitials, getUsersProfileImage } from "@/lib/utils";

export default function UserImage() {
  const user = useUser();

  return (
    <Avatar>
      <AvatarImage src={getUsersProfileImage(user) || ""} />
      <AvatarFallback>{getUsersInitials(user)}</AvatarFallback>
    </Avatar>
  );
}
