import { CategoryTypes } from "@/lib/lists";
import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "views",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: CategoryTypes,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
