// Adds the routemisr API token to NextAuth's types
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;
  }
}
