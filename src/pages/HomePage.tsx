import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <div className="card" style={{ marginTop: 24 }}>
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>BelajarShalatApp</h1>
        <p style={{ marginTop: 0, color: 'var(--color-muted)' }}>
          Aplikasi bacaan shalat lengkap, offline, ringan, dan mudah digunakan.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {/* This Link will work after routing is wired */}
          <Link
            to="/slides/niat"
            style={{
              display: 'inline-block',
              background: 'var(--color-accent)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
            }}
          >
            Mulai
          </Link>
          <Link
            to="/settings"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--color-accent)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              border: '1px solid var(--color-accent)',
            }}
          >
            Pengaturan
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage


