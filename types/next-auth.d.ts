// Adds our own fields to NextAuth's types
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  // what authorize() returns
  interface User {
    token: string;
  }

  // what useSession() / getServerSession() give you
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  // what's stored inside the encrypted cookie
  interface JWT {
    id?: string;
    apiToken?: string;
  }
}
