import React from "react";
import { client } from "@/sanity/lib/client";
import { Startup_By_Author_Query } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(Startup_By_Author_Query, { id });
  
  return (
    <>
      {startups.length ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard
            post={startup}
            key={startup._id}
          />
        ))
      ) : (
        <p className="no-result">No posts added yet</p>
      )}
    </>
  );
};

export default UserStartups;
