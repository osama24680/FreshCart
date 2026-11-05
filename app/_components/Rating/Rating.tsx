import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  value: number;
  starClassName?: string;
}

// Gold stars sit on top of gray ones, cut at the exact rating (4.1 = 82%)
const Rating = ({ value, starClassName = "size-3.5" }: IProps) => {
  const stars = (color: string) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn("shrink-0 fill-current", starClassName, color)}
      />
    ));

  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className="relative inline-flex"
    >
      {stars("text-gray-200")}
      <span
        style={{ width: `${(value / 5) * 100}%` }}
        className="absolute inset-y-0 left-0 flex overflow-hidden"
      >
        {stars("text-yellow-400")}
      </span>
    </span>
  );
};

export default Rating;
