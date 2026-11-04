import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadingProps } from "@/interfaces";

const Loading = ({ label = "Loading", className }: loadingProps) => {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-60 w-full flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600 motion-safe:animate-spin" />
        <ShoppingCart className="size-6 text-primary-600" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
        <span>{label}</span>
        {/* Three dots that bounce one after the other */}
        <span className="flex items-center gap-1 pt-1.5" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}ms` }}
              className="size-1 rounded-full bg-primary-600 motion-safe:animate-bounce"
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Loading;
