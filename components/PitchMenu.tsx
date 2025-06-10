import React from "react";
import { Button } from "./ui/button";
import { EllipsisIcon } from "lucide-react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

const PitchMenu = ({ id, authorId }: { id: string; authorId: string }) => {
  return (
    <div className="flex-center gap-1.5 group hover:transition-colors hover:text-white">
      <Button className="order-2 size-10 rounded-full bg-transparent group-hover:bg-primary transition-colors ">
        <EllipsisIcon className="size-7" />
      </Button>

      <div className="flex-center flex-col gap-2.5 order-1 opacity-0 group-hover:opacity-100">
        <DeleteBtn id={id} authorId={authorId} />
        <EditBtn />
      </div>
    </div>
  );
};

export default PitchMenu;
