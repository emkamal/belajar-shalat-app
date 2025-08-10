// Content data model types

export type Category = 'wajib' | 'sunnah' | 'pendek' | 'panjang'

export interface ContentVariation {
  id: string
  arab: string
  latin: string
  terjemahan: string
  kategori: Category[]
}

export interface DalilItem {
  sumber?: string
  teks: string
}

export interface Penjelasan {
  makna: string
  dalil?: string | DalilItem[]
  catatan_fiqih?: string
}

export interface MediaAudio {
  arab?: string
  latin?: string
}

export interface Media {
  gambar?: string
  audio?: MediaAudio
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
  media?: Media
}

export interface TableOfContentsEntry {
  id: string
  title: string
}


