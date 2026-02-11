import { usePathname } from 'next/navigation';
import { ImportParadigm } from './utils';

export const IMPORT_PARADIGM_LOCALSTORAGE_KEY = 'import-paradigm';

/**
 * Get current import paradigm (dependency or registry) from pathname or localStorage.
 */
export function getCurrentImportParadigm(): ImportParadigm {
  const pathname = usePathname();
  const importParadigmMatch = pathname.match(/\/docs\/components\/(dependency|registry)\//);
  return importParadigmMatch
    ? (importParadigmMatch[1] as ImportParadigm)
    : (typeof localStorage !== 'undefined'
        ? (localStorage.getItem(IMPORT_PARADIGM_LOCALSTORAGE_KEY) as ImportParadigm)
        : null) || ImportParadigm.Dependency; // Default to dependency.
}
