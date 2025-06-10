import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends NextAuth.Session {
    id: string;
  }

  interface JWT extends NextAuth.JWT {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuth.JWT {
    id: string;
  }
}
