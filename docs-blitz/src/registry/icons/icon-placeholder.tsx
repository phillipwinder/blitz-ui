'use client';

import * as React from 'react';
import { SquareIcon } from 'lucide-react';
// import { IconLibraryName, useTheme } from '../theme-provider';

const IconLucide = React.lazy(() =>
  import('./icon-lucide').then((mod) => ({
    default: mod.IconLucide,
  })),
);

// const IconTabler = React.lazy(() =>
//   import("./icon-tabler").then((mod) => ({
//     default: mod.IconTabler,
//   }))
// )

// const IconHugeicons = React.lazy(() =>
//   import("./icon-hugeicons").then((mod) => ({
//     default: mod.IconHugeicons,
//   }))
// )

// const IconPhosphor = React.lazy(() =>
//   import("./icon-phosphor").then((mod) => ({
//     default: mod.IconPhosphor,
//   }))
// )

// const IconRemixicon = React.lazy(() =>
//   import("./icon-remixicon").then((mod) => ({
//     default: mod.IconRemixicon,
//   }))
// )

export function IconPlaceholder({
  ...props
}: {
  [K in string]: string;
} & React.ComponentProps<'svg'>) {
  const [mounted, setMounted] = React.useState(false);
  //   const context = React.useContext(DesignSystemContext);
  //   const [params] = useDesignSystemSearchParams();
  //   const [config] = useConfig();
  // const context = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Priority: Context (includes overrides) > URL Params > LocalStorage Config
  const iconLibraryValue = 'lucide';
  const iconName = props[iconLibraryValue];

  if (!iconName || !mounted) {
    return null;
  }

  return (
    <React.Suspense key={`${iconLibraryValue}-${iconName}`} fallback={<SquareIcon {...props} />}>
      {iconLibraryValue === 'lucide' && <IconLucide name={iconName} {...props} />}
      {/* {iconLibraryValue === "tabler" && (
        <IconTabler name={iconName} {...props} />
      )}
      {iconLibraryValue === "hugeicons" && (
        <IconHugeicons name={iconName} {...props} />
      )}
      {iconLibraryValue === "phosphor" && (
        <IconPhosphor name={iconName} {...props} />
      )}
      {iconLibraryValue === "remixicon" && (
        <IconRemixicon name={iconName} {...props} />
      )} */}
    </React.Suspense>
  );
}
