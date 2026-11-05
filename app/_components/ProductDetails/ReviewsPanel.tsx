"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Star, X } from "lucide-react";
import { IProductDetails } from "@/interfaces";
import { cn } from "@/lib/utils";
import Rating from "../Rating/Rating";

const PAGE_SIZE = 5;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const ReviewsPanel = ({ product }: { product: IProductDetails }) => {
  const { reviews, ratingsAverage, ratingsQuantity } = product;
  const [filter, setFilter] = useState<number | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sorted = useMemo(
    () => [...reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [reviews],
  );
  const counts = useMemo(() => {
    const result = [0, 0, 0, 0, 0];
    for (const { rating } of reviews) {
      const stars = Math.min(Math.max(Math.round(rating), 1), 5);
      result[stars - 1]++;
    }
    return result;
  }, [reviews]);

  const shown = filter
    ? sorted.filter((r) => Math.round(r.rating) === filter)
    : sorted;

  const toggleFilter = (stars: number) => {
    setFilter(filter === stars ? null : stars);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="shrink-0 text-center">
          <p className="mb-2 text-5xl font-bold text-gray-900">
            {ratingsAverage}
          </p>
          <Rating value={ratingsAverage} starClassName="size-5" />
          <p className="mt-2 text-sm text-gray-500">
            Based on {ratingsQuantity} reviews
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="w-full flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = counts[stars - 1];
              const percent = Math.round((count / reviews.length) * 100);
              return (
                <button
                  key={stars}
                  type="button"
                  disabled={count === 0}
                  aria-pressed={filter === stars}
                  aria-label={`Show ${stars} star reviews, ${count} reviews`}
                  onClick={() => toggleFilter(stars)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-1.5 transition-colors enabled:hover:bg-gray-50 disabled:cursor-default",
                    filter === stars &&
                      "bg-yellow-50 enabled:hover:bg-yellow-50",
                  )}
                >
                  <span className="w-12 shrink-0 text-left text-sm whitespace-nowrap text-gray-600">
                    {stars} star
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <span
                      style={{ width: `${percent}%` }}
                      className="block h-full rounded-full bg-yellow-400 motion-safe:animate-grow"
                    />
                  </span>
                  <span className="w-10 shrink-0 text-right text-sm text-gray-500">
                    {percent}%
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        {reviews.length === 0 ? (
          <div className="py-8 text-center">
            <Star
              className="mx-auto mb-3 size-10 fill-current text-gray-300"
              aria-hidden="true"
            />
            <p className="text-gray-500">No written reviews yet.</p>
            <Link
              href="/login"
              className="mt-4 inline-block font-medium text-primary-600 hover:text-primary-700"
            >
              Write a Review
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex flex-wrap items-center gap-2 font-semibold text-gray-900">
                Customer Reviews
                {filter && (
                  <button
                    type="button"
                    onClick={() => toggleFilter(filter)}
                    className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-800 transition-colors hover:bg-yellow-100"
                  >
                    {filter} star ({shown.length})
                    <X className="size-3" aria-hidden="true" />
                    <span className="sr-only">Clear filter</span>
                  </button>
                )}
              </h3>
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Write a Review
              </Link>
            </div>

            <ul className="divide-y divide-gray-100">
              {shown.slice(0, visible).map((review) => (
                <li key={review._id} className="flex gap-3 py-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 uppercase"
                  >
                    {review.user.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3">
                      <p className="font-medium text-gray-900">
                        {review.user.name}
                      </p>
                      <time
                        dateTime={review.createdAt}
                        className="text-xs text-gray-500"
                      >
                        {formatDate(review.createdAt)}
                      </time>
                    </div>
                    <Rating value={review.rating} />
                    <p className="mt-1 text-sm wrap-break-word text-gray-600">
                      {review.review}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {visible < shown.length && (
              <button
                type="button"
                onClick={() => setVisible(visible + PAGE_SIZE)}
                className="mx-auto mt-4 block rounded-xl border-2 border-gray-200 px-6 py-2.5 font-medium text-gray-700 transition hover:border-primary-300 hover:text-primary-600"
              >
                Show More ({shown.length - visible})
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsPanel;
