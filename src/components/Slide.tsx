import { useMemo, useState } from 'react'
import type { ContentItem, ContentVariation } from '../utils/contentTypes'
import { usePreferences } from '../state/PreferencesContext'

export interface SlideProps {
  content: ContentItem
  activeVariationId?: string | null
}

function pickInitialVariation(
  variations: ContentVariation[] | undefined,
  preferred: 'pendek' | 'panjang'
): ContentVariation | null {
  if (!variations || variations.length === 0) return null
  const matchPreferred = variations.find((v) => v.kategori.includes(preferred))
  return matchPreferred ?? variations[0]
}

export default function Slide({ content, activeVariationId }: SlideProps) {
  const { state } = usePreferences()
  const [internalVariationId] = useState<string | null>(
    () => pickInitialVariation(content.variasi, state.defaultVariation)?.id ?? null,
  )

  const currentVariationId = activeVariationId ?? internalVariationId

  const resolved = useMemo(() => {
    if (!currentVariationId || !content.variasi || content.variasi.length === 0) {
      return {
        arab: content.arab ?? '',
        latin: content.latin ?? '',
        terjemahan: content.terjemahan ?? '',
        kategori: content.kategori,
      }
    }
    const v = content.variasi.find((vv) => vv.id === currentVariationId)
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
  }, [currentVariationId, content])

  return (
    <div className="slide">
      {/* Variation UI removed from here; parent can control via props */}

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


