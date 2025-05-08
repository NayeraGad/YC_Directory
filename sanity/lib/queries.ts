import { defineQuery } from "next-sanity";

// Get all startups
export const Startups_Query = defineQuery(`
  *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
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
  }
`);

// Get startup by id
export const Startup_By_ID_Query = defineQuery(`
  *[_type == 'startup' && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      username,
      image,
      bio
    },
    views,
    description,
    image,
    category,
    pitch,
  }
`);

// Get startup views
export const Startups_Views_Query = defineQuery(`
  *[_type == 'startup' && _id == $id][0]{
    _id, views
  }
`);

// Check if user authenticated using GitHub
export const Auth_By_GitHub_Query = defineQuery(`
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

// Get author by id
export const Auth_By_Id_Query = defineQuery(`
  *[_type == 'author' && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const Startup_By_Author_Query = defineQuery(`
  *[_type == 'startup' && author._ref == $id] | order(_createdAt desc) {
    _id,
    title,
    slug,
    author -> {
      _id,
      id,
      name,
      username,
      image
    },
    description,
    views,
    category,
    _createdAt,
    image
  }
`);
