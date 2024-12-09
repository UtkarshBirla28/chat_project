// lib/utils.js
import clsx from "classnames";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge and conditionally apply class names.
 * @param {...any} inputs - List of class names and conditions.
 * @returns {string} - Resolved class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
