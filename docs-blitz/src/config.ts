export const config = {
  appUrl:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : `http://localhost:3000`,
  githubUrl: 'https://github.com/phillipwinder/blitz-ui',
};

export const siteConfig = {
  name: 'Blitz UI',
  title: 'Blitz UI',
  description:
    'A flexible enterprise UI library that you can either install as a dependency or copy as shadcn-style components for full customization.',
  url: config.appUrl,
};
