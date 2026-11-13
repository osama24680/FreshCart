"use client";
import { Toaster, ToastBar } from "react-hot-toast";
import { cn } from "@/lib/utils";

// Bar color per toast type
const barColor = {
  success: "bg-primary-500",
  error: "bg-red-500",
  loading: "bg-gray-300",
  blank: "bg-gray-300",
  custom: "bg-gray-300",
};

const AppToaster = () => (
  <Toaster
    position="top-center"
    // keeps toasts under the announcement bar + navbar
    containerStyle={{ top: 120 }}
    gutter={10}
    toastOptions={{
      duration: 3500,
      error: { duration: 5000 }, // errors stay longer, they need reading
      className:
        "group !relative !overflow-hidden !rounded-xl !px-4 !py-3 !text-sm !font-medium !text-gray-800 !shadow-xl !shadow-gray-900/10 ring-1 ring-gray-100",
      success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
    }}
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          // hovering the toast (group) pauses its timer bar, like the library pauses the timer
          <div className="flex items-center gap-1">
            {icon}
            {message}
            {/* Timer bar: shrinks over the toast's duration */}
            {t.type !== "loading" && (
              <span
                aria-hidden="true"
                style={
                  {
                    "--slide-duration": `${t.duration}ms`,
                  } as React.CSSProperties
                }
                className={cn(
                  "absolute inset-x-0 bottom-0 h-1 origin-left motion-safe:animate-progress [animation-direction:reverse] group-hover:[animation-play-state:paused]",
                  barColor[t.type],
                )}
              />
            )}
          </div>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default AppToaster;
