import React from "react";
import { EditIcon, EllipsisIcon } from "lucide-react";
import DeleteBtn from "./DeleteBtn";
import Link from "next/link";

const PitchMenu = ({ id, authorId }: { id: string; authorId: string }) => {
  return (
    <div className="flex-center gap-1.5 group hover:transition-colors hover:text-white">
      <span className="flex-center order-2 size-10 rounded-full bg-transparent group-hover:bg-primary transition-colors ">
        <EllipsisIcon className="size-7" />
      </span>

      <div className="flex-center flex-col gap-2.5 order-1 opacity-0 group-hover:opacity-100">
        <DeleteBtn id={id} authorId={authorId} />

        <Link
          href={`/startup/edit/${id}`}
          className="flex-center bg-primary size-8 rounded-full"
        >
          <EditIcon className="text-white size-5" />
        </Link>
      </div>
    </div>
  );
};

export default PitchMenu;
