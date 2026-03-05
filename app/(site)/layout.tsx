import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchContactSettings } from '@/lib/settings-api';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchContactSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
