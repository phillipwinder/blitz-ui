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

export enum ImportType {
  Dependency = 'dependency',
  Registry = 'registry',
}

export const importTypes = {
  [ImportType.Dependency]: 'Dependency',
  [ImportType.Registry]: 'shadcn',
};
