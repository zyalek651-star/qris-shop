import './globals.css';
export const metadata = { title: 'Toko Premium', description: 'Beli akun premium otomatis' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="id"><body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>{children}</body></html>);
}
