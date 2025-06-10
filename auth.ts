import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { Auth_By_GitHub_Query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "./sanity/lib/write_client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile) return false;

      const { name, email, image } = user;
      const { id, login, bio } = profile;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(Auth_By_GitHub_Query, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(Auth_By_GitHub_Query, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
