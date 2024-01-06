import { axiosBase } from "@/app/lib/axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const rememberMeCookie = getCookie("remember-me", { req, res });

  let maxAge = rememberMeCookie === "true" ? 7 * 24 * 60 * 60 : 10*60;

  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "username",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const res = await axiosBase.post("/auth/login", {
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = res.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, trigger, session }: any) {
        if (trigger === "update") {
          return { ...token, ...session.user }
        }
        return { ...token, ...user };
      },

      async session({ session, token, user }) {
        session.user = token as any;
        const decoded = jwtDecode(session.user.access_token) as any;
        session.user.id = decoded.uid;
        session.user.role = decoded.auth[0].authority;
        session.user.username = decoded.sub;
        return session;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
    session: {
      strategy: "jwt",
      maxAge,
      updateAge:0
    },
    jwt: {
      maxAge,
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });
}
