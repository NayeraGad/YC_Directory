import React from "react";
import { formateDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import UserAvatar from "./UserAvatar";
import { Skeleton } from "./ui/skeleton";

export type StartupCardType = Omit<Startup, "author"> & {
  author?: Author;
};

const StartupCard = ({
  post,
}: {
  post: StartupCardType;
}) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title,
  } = post;

  return (
    <li className="startup-card group relative">
      <div className="flex-between">
        <p className="startup-card_date">{formateDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <Eye className="text-primary size-6" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <p className="text-26-semibold line-clamp-1">{title}</p>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <UserAvatar
            name={author?.name as string}
            image={author?.image as string}
            className="size-12"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt={title} className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkelton = () => (
  <>
    {[0, 1, 2, 3, 4].map((i: number) => {
      <li key={i}>
        <Skeleton className=" startup-card_skeleton" />
      </li>;
    })}
  </>
);

export default StartupCard;
