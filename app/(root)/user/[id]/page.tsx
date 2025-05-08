import React, { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { Auth_By_Id_Query } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkelton } from "@/components/StartupCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await client.fetch(Auth_By_Id_Query, {
    id,
  });

  if (!user) return notFound();

  const { name, username, image, bio } = user;

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black text-center uppercase line-clamp-1">
              {name}
            </h3>
          </div>

          <Image
            src={image as string}
            alt={`${name}'s avatar`}
            width={220}
            height={220}
            className="profile_image"
          />

          <span className="mt-7 text-30-extrabold">@{username}</span>
          <p className="mt-1 text-14-normal">{bio}</p>
        </div>

        <div>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkelton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
