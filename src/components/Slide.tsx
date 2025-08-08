import { useMemo, useState } from 'react'
import type { ContentItem, ContentVariation } from '../utils/contentTypes'
import { usePreferences } from '../state/PreferencesContext'

export interface SlideProps {
  content: ContentItem
  showVariationPicker?: boolean
}

function pickInitialVariation(
  variations: ContentVariation[] | undefined,
  preferred: 'pendek' | 'panjang'
): ContentVariation | null {
  if (!variations || variations.length === 0) return null
  const matchPreferred = variations.find((v) => v.kategori.includes(preferred))
  return matchPreferred ?? variations[0]
}

export default function Slide({ content, showVariationPicker = true }: SlideProps) {
  const { state } = usePreferences()
  const [activeVariationId, setActiveVariationId] = useState<string | null>(
    () => pickInitialVariation(content.variasi, state.defaultVariation)?.id ?? null,
  )

  const resolved = useMemo(() => {
    if (!activeVariationId || !content.variasi || content.variasi.length === 0) {
      return {
        arab: content.arab ?? '',
        latin: content.latin ?? '',
        terjemahan: content.terjemahan ?? '',
        kategori: content.kategori,
      }
    }
    const v = content.variasi.find((vv) => vv.id === activeVariationId)
    if (!v) {
      return {
        arab: content.arab ?? '',
        latin: content.latin ?? '',
        terjemahan: content.terjemahan ?? '',
        kategori: content.kategori,
      }
    }
    return {
      arab: v.arab,
      latin: v.latin,
      terjemahan: v.terjemahan,
      kategori: v.kategori,
    }
  }, [activeVariationId, content])

  return (
    <div className="slide">
      {/* Variation selector (simple) */}
      {showVariationPicker && content.variasi && content.variasi.length > 0 && (
        <div className="variation-picker">
          <button
            type="button"
            onClick={() => setActiveVariationId(null)}
            className={`btn btn-chip ${activeVariationId === null ? '' : 'btn-outline'}`}
          >
            Default
          </button>
          {content.variasi.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveVariationId(v.id)}
              className={`btn btn-chip ${activeVariationId === v.id ? '' : 'btn-outline'}`}
            >
              {v.kategori.includes('panjang') ? 'Panjang' : v.kategori.includes('pendek') ? 'Pendek' : v.id}
            </button>
          ))}
        </div>
      )}

      {/* Content fields based on preferences */}
      {state.showArab && resolved.arab && (
        <div className="text-arabic" dir="rtl">{resolved.arab}</div>
      )}

      {state.showLatin && resolved.latin && <p className="section">{resolved.latin}</p>}

      {state.showTerjemahan && resolved.terjemahan && (
        <p className="text-muted">{resolved.terjemahan}</p>
      )}
    </div>
  )
}


