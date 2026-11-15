"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";

const NavUser = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span
        aria-hidden="true"
        className="ml-2 hidden h-10 w-28 animate-pulse rounded-full bg-gray-100 lg:block"
      />
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <Link
        href="/login"
        className="ml-2 hidden items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 lg:flex"
      >
        <User className="size-3" />
        Sign In
      </Link>
    );
  }

  const name = session.user.name ?? "Account";
  const firstName = name.split(" ")[0];

  async function handleSignOut() {
    await signOut({ redirect: false });
    toast.success("Signed out. See you soon 👋", { id: "auth" });
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="group relative ml-2  hidden lg:block">
      <button
        type="button"
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pr-3 pl-1 text-sm font-semibold text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-600 text-white uppercase transition-transform group-hover:scale-105">
          {name[0]}
        </span>
        {firstName}
        <ChevronDown className="size-3 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
      </button>

      <div className="invisible absolute top-full right-0 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="min-w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
          <div className="border-b border-gray-100 px-3 pt-1 pb-3">
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="truncate text-xs text-gray-500">
              {session.user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
