import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      username: string;
      email: string;
      name: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
      refresh_expires_in: number;
      session_expiry: string;
    };
  }
}
