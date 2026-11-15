import { baseURL } from "@/api/constants";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "login",
      name: "Login...",
      credentials: {
        email: {},
        password: {},
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
        const jwt = jwtDecode(result.token);
        console.log("jwt", jwt);
        const { id, role } = jwt as { id: string; role: string };
        return {
          id,
          role,
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

        const jwt = jwtDecode(result.token);
        console.log("jwt", jwt);
        const { id, role } = jwt as { id: string; role: string };
        return {
          id,
          role,
          name: result.user.name,
          email: result.user.email,
          token: result.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      const { token, user } = params;
      console.log("jwt callback", { token, user });
      if (user) {
        token.apiToken = user.token;
        token.id = user.id;
      }
      console.log("apiToken", token);
      return token;
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
