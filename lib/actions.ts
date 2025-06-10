"use server";

import { auth } from "@/auth";
import { parseServerResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write_client";
import { client } from "@/sanity/lib/client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerResponse({ error: "Not signed in", status: "ERROR" });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, {
    replacement: "-",
    lower: true,
    strict: true,
  });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });

    return parseServerResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const deletePitch = async ({
  id,
  authorId,
}: {
  id: string;
  authorId: string;
}) => {
  try {
    // Get the startup
    const startup = await client.fetch(
      `*[_type == "startup" && _id == $id][0]{
        _id,
        author->{_id}
      }`,
      { id }
    );

    if (!startup) {
      return parseServerResponse({
        error: "startup not found.",
        status: "ERROR",
      });
    }

    // Check if author matches
    if (startup.author._id !== authorId) {
      return parseServerResponse({
        error: "You are not authorized to delete this startup.",
        status: "ERROR",
      });
    }

    // Delete if authorized
    await writeClient.delete(id);

    return parseServerResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
