import type { ContentItem, TableOfContentsEntry } from './contentTypes'

export async function loadTOC(): Promise<TableOfContentsEntry[]> {
  const res = await fetch('/src/data/toc.json')
  if (!res.ok) throw new Error('Failed to load TOC')
  return (await res.json()) as TableOfContentsEntry[]
}

export async function loadContentById(id: string): Promise<ContentItem> {
  // simple mapping for sample data; expand with more ids as added
  if (id === 'ruku_1') {
    const res = await fetch('/src/data/bacaan/ruku_1.json')
    if (!res.ok) throw new Error('Failed to load content: ruku_1')
    return (await res.json()) as ContentItem
  }

  throw new Error(`Content not found for id: ${id}`)
}


