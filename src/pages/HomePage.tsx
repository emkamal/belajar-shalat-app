import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <div className="card section hero-card">
        <h1 className="hero-title">BelajarShalatApp</h1>
        <p className="lead">
          Aplikasi bacaan shalat lengkap, offline, ringan, dan mudah digunakan.
        </p>

        <div className="row cta-row">
          {/* This Link will work after routing is wired */}
          <Link
            to="/slides/niat_1"
            className="btn btn-lg"
          >
            Mulai
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage


