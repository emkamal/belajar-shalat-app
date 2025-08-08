// Content data model types

export type Category = 'wajib' | 'sunnah' | 'pendek' | 'panjang'

export interface ContentVariation {
  id: string
  arab: string
  latin: string
  terjemahan: string
  kategori: Category[]
}

export interface Penjelasan {
  makna: string
  dalil?: string
}

export interface ContentItem {
  id: string
  title: string
  arab?: string
  latin?: string
  terjemahan?: string
  kategori: Category[]
  variasi?: ContentVariation[]
  penjelasan?: Penjelasan
  ilustrasi?: string // filename under public/illustrations
}

export interface TableOfContentsEntry {
  id: string
  title: string
}


