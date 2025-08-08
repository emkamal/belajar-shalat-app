import type { ContentItem, TableOfContentsEntry } from './contentTypes'

export async function loadTOC(): Promise<TableOfContentsEntry[]> {
  const res = await fetch('/data/toc.json')
  if (!res.ok) throw new Error('Failed to load TOC')
  return (await res.json()) as TableOfContentsEntry[]
}

export async function loadContentById(id: string): Promise<ContentItem> {
  const res = await fetch(`/data/bacaan/${id}.json`)
  if (!res.ok) throw new Error(`Content not found for id: ${id}`)
  return (await res.json()) as ContentItem
}


