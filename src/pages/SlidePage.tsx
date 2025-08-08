import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadContentById, loadTOC } from '../utils/contentLoader'
import type { ContentItem, TableOfContentsEntry } from '../utils/contentTypes'
import Slide from '../components/Slide'
import ToggleGroup from '../components/ToggleGroup'
import FontSizePicker from '../components/FontSizePicker'
import CategoryChips from '../components/CategoryChips'
import Illustration from '../components/Illustration'
import InfoPanel from '../components/InfoPanel'
import NavControls from '../components/NavControls'
import { usePreferences } from '../state/PreferencesContext'

function SlidePage() {
  const { id } = useParams()
  const { state } = usePreferences()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [toc, setToc] = useState<TableOfContentsEntry[]>([])
  // Also respect global preference toggled from header menu
  const [showConfig, setShowConfig] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const [data, tocData] = await Promise.all([loadContentById(id), loadTOC()])
        if (!cancelled) {
          setContent(data)
          setToc(tocData)
        }
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
      <div className="card section">
        {!id && <p>Invalid slide id</p>}
        {loading && <p>Memuat…</p>}
        {error && <p style={{ color: 'tomato' }}>{error}</p>}
        {!loading && !error && content && (
          <>
            <h2 style={{ marginTop: 0 }}>{content.title}</h2>
            {content.ilustrasi && <Illustration file={content.ilustrasi} />}

            <div className="section">
              <button
                type="button"
                className="btn btn-outline btn-chip"
                onClick={() => setShowConfig((v) => !v)}
                aria-expanded={showConfig || state.showConfig}
              >
                {showConfig || state.showConfig ? 'Sembunyikan pengaturan' : 'Tampilkan pengaturan'}
              </button>
            </div>

            {(showConfig || state.showConfig) && (
              <div className="row section">
                <ToggleGroup />
                <FontSizePicker />
              </div>
            )}

            <div className="section">
              <CategoryChips categories={content.kategori} />
            </div>

            <div className="section">
              <Slide content={content} showVariationPicker={showConfig || state.showConfig} />
            </div>

            <InfoPanel makna={content.penjelasan?.makna} dalil={content.penjelasan?.dalil} />

            {id && toc.length > 0 && <NavControls toc={toc} currentId={id} />}
          </>
        )}
      </div>
    </main>
  )
}

export default SlidePage


