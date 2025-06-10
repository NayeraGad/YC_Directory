import React, { Suspense } from "react";
import { formateDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  Playlist_By_Slug_Query,
  Startup_By_ID_Query,
} from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import UserAvatar from "@/components/UserAvatar";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import PitchMenu from "@/components/PitchMenu";
import { auth } from "@/auth";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  let personalPosts: boolean = false;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(Startup_By_ID_Query, { id }),
    client.fetch(Playlist_By_Slug_Query, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const { title, image, description, _createdAt, author, category } = post;

  if (session?.id === author._id) personalPosts = true;

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container min-h-[230px]">
        <span className="tag">{formateDate(_createdAt)}</span>
        <h1 className="heading"> {title} </h1>
        <p className="sub-heading">{description}</p>
      </section>

      <section className="section_container">
        <img
          alt={`${title}'s thumbnail`}
          src={image}
          className="w-full h-auto rounded-xl lg:max-w-5xl lg:mx-auto"
        />

        <div className="mx-auto mt-10 space-y-5 max-w-4xl">
          <div className="flex-between gap-5">
            <div>
              <Link
                href={`/user/${author._id}`}
                className="flex items-center gap-2 mb-3"
              >
                <UserAvatar
                  name={author?.name as string}
                  image={author?.image as string}
                  className="size-16 drop-shadow-lg"
                />

                <div className="flex flex-col">
                  <span className="text-20-medium"> {author.name} </span>
                  <span className="text-black-300 text-16-medium">
                    @{author.username}
                  </span>
                </div>
              </Link>
            </div>

            {personalPosts && <PitchMenu id={id} authorId={author._id} />}
          </div>

          <span className="inline-block mb-2.5 category-tag">{category}</span>

          <h3 className="text-30-bold">Pitch Details</h3>

          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="max-w-4xl prose text-justify"
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
