"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TLDS = [".com", ".dev", ".xyz", ".ai", ".io", ".app", ".org"];

export function BrandLogo({
  className,
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TLDS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [animated]);

  return (
    <div className={cn("inline-flex items-center gap-2 font-serif select-none", className)}>
      <svg
        viewBox="0 0 256 222"
        className="size-4.5 sm:size-5 text-primary shrink-0 transition-transform group-hover:scale-110"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="m128 0 128 221.705H0z" />
      </svg>
      <span className="text-muted-foreground/50 font-light text-xl sm:text-2xl leading-none">
        \
      </span>
      <span className="relative inline-block h-8 min-w-[4.5rem] overflow-hidden">
        {animated ? (
          <span
            key={TLDS[index]}
            className="inline-block font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {TLDS[index]}
          </span>
        ) : (
          <span className="inline-block font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            .dev
          </span>
        )}
      </span>
    </div>
  );
}
