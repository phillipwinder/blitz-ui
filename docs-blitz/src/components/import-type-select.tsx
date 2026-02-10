'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  SelectTrigger,
  SelectValue,
  SelectPositioner,
  SelectContent,
  SelectItem,
  Select,
} from '@/registry/components/ui/select';
import { ImportType, importTypes } from '@/lib/utils';

export function ImportTypeSelect({ value }: { value: ImportType }) {
  const router = useRouter();
  const params = useSearchParams();

  const handleValueChange = (newValue: ImportType) => {
    const p = new URLSearchParams(params.toString());
    p.set('import', newValue);
    router.replace(`?${p.toString()}`, { scroll: false });
  };

  // const [importType, setImportType] = useState<ImportType | null>(null);

  // const handleValueChange = useCallback((newValue: ImportType) => {
  //   localStorage.setItem('import-type', newValue);
  //   setImportType(newValue);
  // }, []);

  // useEffect(() => {
  //   const saved = localStorage.getItem('import-type') as ImportType | null;
  //   if (saved && saved !== value && Object.keys(importTypes).includes(saved)) {
  //     handleValueChange(saved);
  //   }
  // }, [handleValueChange, value]);

  return (
    <Select
      onValueChange={(newValue) => handleValueChange(newValue as ImportType)}
      items={importTypes}
      value={value}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPositioner alignItemWithTrigger>
        <SelectContent>
          {Object.entries(importTypes).map(([importType, label]) => (
            <SelectItem key={importType} value={importType}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
