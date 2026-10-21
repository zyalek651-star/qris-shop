'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Variant = { id: number; name: string; price: number };

export default function BuyButton({ variants }: { variants: Variant[] }) {
  const [selected, setSelected] = useState<number>(variants[0]?.id);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function buy() {
    setLoading(true);
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ variant_id: selected }),
    });
    const data = await res.json();
    if (data.order_id) router.push(`/bayar/${data.order_id}`);
    else { alert(data.error ?? 'gagal'); setLoading(false); }
  }

  return (
    <div style={{ marginTop: 32 }}>
      <p style={{ color: '#666', fontSize: 14 }}>Pilih versi:</p>
      <div style={{ display: 'grid', gap: 8 }}>
        {variants.map(v => (
          <label key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: selected === v.id ? '2px solid black' : '1px solid #ccc', borderRadius: 10, padding: 12, cursor: 'pointer', background: 'white' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="radio" checked={selected === v.id} onChange={() => setSelected(v.id)} />
              <b>{v.name}</b>
            </span>
            <span>Rp {v.price.toLocaleString('id-ID')}</span>
          </label>
        ))}
      </div>
      <button onClick={buy} disabled={loading || !selected} style={{ width: '100%', marginTop: 20, background: 'black', color: 'white', padding: 14, border: 'none', borderRadius: 10, fontSize: 16, opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Memproses…' : 'Beli Sekarang'}
      </button>
    </div>
  );
}
