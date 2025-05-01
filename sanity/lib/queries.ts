import { defineQuery } from "next-sanity";

export const Startups_Query = defineQuery(
  `*[_type == 'startup' && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    email,
    image
  },
  views,
  description,
  image,
  category,
  _createdAt
}`
);

