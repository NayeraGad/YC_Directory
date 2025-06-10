"use client";
import React from "react";
import { EditIcon } from "lucide-react";
import Link from "next/link";

const EditBtn = () => {
  return (
    <Link href="/startup/create" className="flex-center bg-primary size-8 rounded-full">
      <EditIcon className="text-white size-5" />
    </Link>
  );
};

export default EditBtn;
