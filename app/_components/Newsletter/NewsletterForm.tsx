"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";

const NewsletterForm = () => {
  const [subscribed, setSubscribed] = useState(false);

  // TODO: send the email to a real endpoint — the API has no newsletter route yet
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <p
        role="status"
        className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-medium text-emerald-700"
      >
        <CircleCheck className="size-5 shrink-0" aria-hidden="true" />
        Thanks! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pt-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full min-w-0 flex-1 rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-base text-gray-800 shadow-sm transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
        />
        <button
          type="submit"
          className="group flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/40"
        >
          Subscribe
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
      <p className="mt-3 flex items-center gap-1.5 pl-1 text-xs text-gray-500">
        <Sparkles className="size-3 text-emerald-500" aria-hidden="true" />
        Unsubscribe anytime. No spam, ever.
      </p>
    </form>
  );
};

export default NewsletterForm;
