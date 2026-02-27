import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * If the provided className is a string, it will be returned as is.
 * Otherwise, the function will call the className function with the state as the first argument.
 *
 * @param className
 * @param state
 */
export function resolveClassName<State>(
  className: string | ((state: State) => string | undefined) | undefined,
  state: State,
) {
  return typeof className === 'function' ? className(state) : className;
}

export interface UnstyledProps {
  unstyled?: boolean;
}
