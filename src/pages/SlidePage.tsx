import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion'

function SlidePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { dir?: number } }
  const { state } = usePreferences()
  const [content, setContent] = useState<ContentItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [toc, setToc] = useState<TableOfContentsEntry[]>([])
  // Also respect global preference toggled from header menu
  const [showConfig] = useState<boolean>(false)
  // Direction for page transitions comes from router state

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
  // Derive direction for this render
  const effectiveDir = (location.state && typeof location.state.dir === 'number' ? location.state.dir : 0) as number

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && prevId) navigate(`/slides/${prevId}`, { state: { dir: -1 } })
      if (e.key === 'ArrowRight' && nextId) navigate(`/slides/${nextId}`, { state: { dir: 1 } })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prevId, nextId, navigate])

  // Swipe navigation
  const swipeHandlers = useSwipeable({
    // Swiping left: go to next; set direction for exit before navigate
    onSwipedLeft: () => {
      if (nextId) navigate(`/slides/${nextId}`, { state: { dir: 1 } })
    },
    // Swiping right: go to previous
    onSwipedRight: () => {
      if (prevId) navigate(`/slides/${prevId}`, { state: { dir: -1 } })
    },
    trackTouch: true,
    trackMouse: true,
  })

  // Framer Motion variants using custom direction value
  const slideVariants = {
    enter: (dir: number): TargetAndTransition => ({ x: dir === 0 ? 0 : dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 } as TargetAndTransition,
    exit: (dir: number): TargetAndTransition => ({ x: dir === 0 ? 0 : dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <main {...swipeHandlers} className="has-bottom-bar overflow-hidden">
      <AnimatePresence mode="wait" initial={false} custom={effectiveDir}>
        <motion.div
          key={id}
          custom={effectiveDir}
          variants={slideVariants}
          initial={typeof effectiveDir === 'number' ? 'enter' : undefined}
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="card section">
            {!id && <p>Invalid slide id</p>}
            {loading && <p>Memuat…</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !error && content && (
              <>
                <h2 className="no-top-margin">{content.title}</h2>
                {content.ilustrasi && <Illustration file={content.ilustrasi} />}
                <div className="ornate-divider" />

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

                <div className="ornate-divider" />
                <InfoPanel makna={content.penjelasan?.makna} dalil={content.penjelasan?.dalil} />
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      {id && toc.length > 0 && (
        <div className="bottom-bar">
          <div className="row">
            <NavControls toc={toc} currentId={id} />
          </div>
        </div>
      )}
    </main>
  )
}

export default SlidePage


