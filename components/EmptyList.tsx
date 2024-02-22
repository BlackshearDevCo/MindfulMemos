import React from "react";

export default function EmptyList({
  title = "Take a breather, you've got this.",
}: {
  title?: string;
}) {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <h2 className="text-xl font-extralight text-center px-2 transform -translate-y-6">
        {/* Todo: Make this dynamic and choose from a list */}
        {title}
      </h2>
    </div>
  );
}
