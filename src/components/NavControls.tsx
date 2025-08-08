import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TableOfContentsEntry } from '../utils/contentTypes'

export default function NavControls({ toc, currentId }: { toc: TableOfContentsEntry[]; currentId: string }) {
  const navigate = useNavigate()
  const { prevId, nextId } = useMemo(() => {
    const idx = toc.findIndex((e) => e.id === currentId)
    if (idx === -1) return { prevId: null as string | null, nextId: null as string | null }
    return {
      prevId: idx > 0 ? toc[idx - 1].id : null,
      nextId: idx < toc.length - 1 ? toc[idx + 1].id : null,
    }
  }, [toc, currentId])

  return (
    <div className="row" style={{ justifyContent: 'space-between', marginTop: 16 }}>
      <button
        type="button"
        disabled={!prevId}
        onClick={() => prevId && navigate(`/slides/${prevId}`)}
        className="btn btn-outline"
      >
        ← Sebelumnya
      </button>
      <button
        type="button"
        disabled={!nextId}
        onClick={() => nextId && navigate(`/slides/${nextId}`)}
        className="btn btn-outline"
      >
        Selanjutnya →
      </button>
    </div>
  )
}


