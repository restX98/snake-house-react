"use client";

import { cn } from "@/lib/utils";

function BoxContainer({ children, className }) {
  return (
    <div
      className={cn(
        className,
        "overflow-y-auto",
        "[&_.snake-box]:relative [&_.snake-box]:z-10",
      )}
    >
      {children}
    </div>
  );
}

export default BoxContainer;
