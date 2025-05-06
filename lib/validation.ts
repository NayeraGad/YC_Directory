import { z } from "zod";
import { CategoryTypes } from "./lists";

const categoryTitles = CategoryTypes.map((category) => category.value) as [
  string,
];

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(15).max(500),
  category: z.enum(categoryTitles),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
