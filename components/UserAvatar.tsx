import { getInitials } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className: string;
}) => {
  const initials = getInitials(name);

  const isGithubFallback = image?.includes(
    "https://avatars.githubusercontent.com/u/"
  );

  return (
    <Avatar className={className}>
      {!isGithubFallback && image && (
        <AvatarImage src={image} alt={`${name}'s avatar`} />
      )}
      <AvatarFallback className="bg-primary text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
