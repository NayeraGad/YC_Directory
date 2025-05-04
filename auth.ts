import NextAuth, { JWT } from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { Auth_By_GitHub_Query } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write_client";
import { User, Profile, Account, Session } from "next-auth";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile: Profile }) {
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

    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
    }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(Auth_By_GitHub_Query, {
            id: profile.id,
          });

        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      Object.assign(session, { id: token.id });

      return session;
    },
  },
});
