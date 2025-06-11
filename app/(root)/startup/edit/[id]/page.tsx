import StartupForm from "@/components/StartupForm";
import { client } from "@/sanity/lib/client";
import { Startup_By_ID_Query } from "@/sanity/lib/queries";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const post = await client.fetch(Startup_By_ID_Query, { id });

  return (
    <>
      <section className="pink_container min-h-[230px]">
        <h1 className="heading">Edit Your Startup</h1>
      </section>

      <StartupForm post={post} />
    </>
  );
};

export default page;
