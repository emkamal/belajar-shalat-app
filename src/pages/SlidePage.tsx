import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadContentById } from '../utils/contentLoader'
import type { ContentItem } from '../utils/contentTypes'

function SlidePage() {
  const { id } = useParams()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const data = await loadContentById(id)
        if (!cancelled) setContent(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <main>
      <div className="card" style={{ marginTop: 24 }}>
        {!id && <p>Invalid slide id</p>}
        {loading && <p>Memuat…</p>}
        {error && <p style={{ color: 'tomato' }}>{error}</p>}
        {!loading && !error && content && (
          <>
            <h2 style={{ marginTop: 0 }}>{content.title}</h2>
            {content.ilustrasi && (
              <img
                src={`/illustrations/${content.ilustrasi}`}
                alt="Ilustrasi gerakan shalat"
                style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)' }}
                loading="lazy"
              />
            )}
            {content.arab && (
              <div className="text-arabic" dir="rtl" style={{ marginTop: 16 }}>
                {content.arab}
              </div>
            )}
            {content.latin && <p style={{ marginTop: 12 }}>{content.latin}</p>}
            {content.terjemahan && (
              <p style={{ marginTop: 8, color: 'var(--color-muted)' }}>{content.terjemahan}</p>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default SlidePage


