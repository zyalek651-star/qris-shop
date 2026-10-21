import { db } from '@/lib/db';
import Link from 'next/link';

export default async function Home() {
  const { rows } = await db.query('select slug, name, description from products order by id');
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Toko Premium</h1>
      <p style={{ color: '#666' }}>Bayar via QRIS, barang langsung dikirim.</p>
      <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
        {rows.map(p => (
          <div key={p.slug} style={{ border: '1px solid #ddd', borderRadius: 12, padding: 20, background: 'white' }}>
            <h2 style={{ fontSize: 18, margin: 0 }}>{p.name}</h2>
            <p style={{ color: '#666', marginTop: 4 }}>{p.description}</p>
            <Link href={`/produk/${p.slug}`} style={{ display: 'inline-block', marginTop: 12, background: 'black', color: 'white', padding: '10px 18px', borderRadius: 8, textDecoration: 'none' }}>Buy</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
