import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { Startups_Views_Query } from "@/sanity/lib/queries";
import { formateNumber } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write_client";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(Startups_Views_Query, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      {views && (
        <p className="view-text">
          <span className="font-black">
            {formateNumber(views)} {views === 1 ? "View" : "Views"}
          </span>
        </p>
      )}
    </div>
  );
};

export default View;
