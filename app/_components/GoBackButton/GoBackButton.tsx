"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg sm:w-auto"
    >
      <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
      Go Back
    </button>
  );
};

export default GoBackButton;
