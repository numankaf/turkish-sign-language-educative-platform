import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      role: string;
      username: string;
      email: string;
      name: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
      refresh_expires_in: number;
    };
  }
}
