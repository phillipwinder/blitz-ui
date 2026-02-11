import { clsx, type ClassValue } from 'clsx';
import isEqual from 'lodash.isequal';
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

export function isDeepEqual(a: unknown, b: unknown): boolean {
  return isEqual(a, b);
}

export enum ImportParadigm {
  Dependency = 'dependency',
  Registry = 'registry',
}

export const importParadigms = [
  {
    key: ImportParadigm.Dependency,
    title: 'Dependency',
  },
  {
    key: ImportParadigm.Registry,
    title: 'Registry',
  },
] as const;
