import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
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
import { AnimatePresence, motion } from 'framer-motion'

function SlidePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = usePreferences()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [toc, setToc] = useState<TableOfContentsEntry[]>([])
  // Also respect global preference toggled from header menu
  const [showConfig] = useState<boolean>(false)
  const [direction, setDirection] = useState<number>(0)
  const previousIndexRef = useRef<number | null>(null)

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

  const { prevId, nextId } = useMemo(() => {
    const idx = toc.findIndex((e) => e.id === id)
    if (idx === -1) return { prevId: null as string | null, nextId: null as string | null }
    return {
      prevId: idx > 0 ? toc[idx - 1].id : null,
      nextId: idx < toc.length - 1 ? toc[idx + 1].id : null,
    }
  }, [toc, id])

  // Track direction based on TOC order when id changes
  useEffect(() => {
    const currentIndex = toc.findIndex((e) => e.id === id)
    if (currentIndex === -1) return
    if (previousIndexRef.current === null) {
      setDirection(0)
    } else if (currentIndex > previousIndexRef.current) {
      setDirection(1) // moving forward (next)
    } else if (currentIndex < previousIndexRef.current) {
      setDirection(-1) // moving backward (prev)
    }
    previousIndexRef.current = currentIndex
  }, [id, toc])

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && prevId) navigate(`/slides/${prevId}`)
      if (e.key === 'ArrowRight' && nextId) navigate(`/slides/${nextId}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prevId, nextId, navigate])

  // Swipe navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextId && navigate(`/slides/${nextId}`),
    onSwipedRight: () => prevId && navigate(`/slides/${prevId}`),
    trackTouch: true,
    trackMouse: true,
  })

  return (
    <main {...swipeHandlers} className="has-bottom-bar" style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={id}
          initial={{ x: direction === 0 ? 0 : direction > 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 0 ? 0 : direction > 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="card section">
            {!id && <p>Invalid slide id</p>}
            {loading && <p>Memuat…</p>}
            {error && <p style={{ color: 'tomato' }}>{error}</p>}
            {!loading && !error && content && (
              <>
                <h2 style={{ marginTop: 0 }}>{content.title}</h2>
                {content.ilustrasi && <Illustration file={content.ilustrasi} />}

                {(showConfig || state.showConfig) && (
                  <div className="row section">
                    <ToggleGroup />
                    <FontSizePicker />
                  </div>
                )}

                <div className="section">
                  <Slide content={content} showVariationPicker={showConfig || state.showConfig} />
                </div>

                <div className="section">
                  <CategoryChips categories={content.kategori} />
                </div>

                <InfoPanel makna={content.penjelasan?.makna} dalil={content.penjelasan?.dalil} />

                <div className="bottom-bar">
                  <div className="row">
                    {id && toc.length > 0 && <NavControls toc={toc} currentId={id} />}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

export default SlidePage


