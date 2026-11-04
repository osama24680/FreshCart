"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Coupon "ticket": click to copy the code, shows a check for 2s
const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (http / permissions) — nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy coupon code ${code}`}
      className="group/code inline-flex items-center gap-2 rounded-lg border border-dashed border-white/60 bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm transition-colors hover:bg-white/20"
    >
      <span className="text-white/70">Code:</span>
      <span className="font-bold tracking-wider text-white">{code}</span>
      {copied ? (
        <Check className="size-3.5 text-white" />
      ) : (
        <Copy className="size-3.5 text-white/70 transition-transform group-hover/code:scale-110" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
};

export default CopyCode;
