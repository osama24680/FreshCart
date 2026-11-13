import { baseURL } from "@/api/constants";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "login",
      name: "Login...",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email ",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password ",
        },
      },

      async authorize(credentials) {
        const res = await fetch(`${baseURL}/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "content-type": "application/json" },
        });
        const result = await res.json();

        if (!res.ok || !result.user) {
          throw new Error(result.message || "Incorrect email or password");
        }

        return {
          id: result.user.email,
          name: result.user.name,
          email: result.user.email,
          token: result.token,
        };
      },
    }),
    Credentials({
      id: "register",
      name: "Register...",
      credentials: {
        name: {},
        email: {},
        password: {},
        rePassword: {},
        phone: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${baseURL}/api/v1/auth/signup`, {
          method: "POST",
          body: JSON.stringify({
            name: credentials?.name,
            email: credentials?.email,
            password: credentials?.password,
            rePassword: credentials?.rePassword,
            phone: credentials?.phone,
          }),
          headers: { "content-type": "application/json" },
        });
        const result = await res.json();

         if (!res.ok || !result.user) {
           throw new Error(
             result?.errors?.msg ??
               result.message ??
               "Could not create the account",
           );
         }

        return {
          id: result.user.email,
          name: result.user.name,
          email: result.user.email,
          token: result.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.apiToken = user.token;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
