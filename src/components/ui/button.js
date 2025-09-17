"use client";

import React from "react";
import clsx from "clsx";

export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "bg-green-600 text-white hover:bg-green-700 px-4 py-2",
        className
      )}
    >
      {children}
    </button>
  );
}
