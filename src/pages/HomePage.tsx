import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <div className="card section">
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>BelajarShalatApp</h1>
        <p className="text-muted" style={{ marginTop: 0 }}>
          Aplikasi bacaan shalat lengkap, offline, ringan, dan mudah digunakan.
        </p>

        <div className="row" style={{ marginTop: 16 }}>
          {/* This Link will work after routing is wired */}
          <Link
            to="/slides/ruku_1"
            className="btn"
          >
            Mulai
          </Link>
          <Link
            to="/settings"
            className="btn btn-outline"
          >
            Pengaturan
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage


