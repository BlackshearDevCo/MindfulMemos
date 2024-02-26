"use client";

import { useUser } from "@/lib/hooks/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import React from "react";

export default function UserImage() {
  // TODO: Update with user type when image property exists
  const user: any = useUser();

  return (
    <Avatar>
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>MM</AvatarFallback>
    </Avatar>
  );
}
