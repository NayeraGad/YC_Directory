import React, { Suspense } from "react";
import { formateDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Startup_By_ID_Query } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const post = await client.fetch(Startup_By_ID_Query, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container min-h-[230px]">
        <span className="tag">{formateDate(post?._createdAt)}</span>
        <h1 className="heading"> {post?.title} </h1>
        <p className="sub-heading">{post?.description}</p>
      </section>

      <section className="section_container">
        {/* Startup details */}
        <img
          alt={`${post.title}'s thumbnail`}
          src={post.image}
          className="w-full h-auto rounded-xl"
        />

        <div className=" mx-auto mt-10 space-y-5 max-w-4xl ">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex items-center gap-2 mb-3"
            >
              <Image
                alt={`${post.author.name}s avatar`}
                src={post.author.image}
                width={64}
                height={64}
                className=" rounded-full drop-shadow-lg "
              />

              <div className=" flex flex-col">
                <span className="text-20-medium"> {post.author.name} </span>
                <span className="text-black-300 text-16-medium">
                  @{post.author.username}
                </span>
              </div>
            </Link>

            <span className="category-tag"> {post.category} </span>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>

          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className=" max-w-4xl prose text-justify"
            />
          ) : (
            <p className=" no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* Editor picks */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
