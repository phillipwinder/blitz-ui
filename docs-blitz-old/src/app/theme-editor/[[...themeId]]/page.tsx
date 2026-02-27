import { getTheme } from '@/actions/themes';
import Editor from '@/components/editor/editor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blitz UI — Theme Generator',
  description:
    'Easily customize and preview your theme with Blitz UI. Modify colors, fonts, and styles in real-time.',
};

export default async function Page({ params }: { params: Promise<{ themeId: string[] }> }) {
  const { themeId } = await params;
  const themePromise = themeId?.length > 0 ? getTheme(themeId?.[0]) : Promise.resolve(null);

  return <Editor themePromise={themePromise} />;
}
