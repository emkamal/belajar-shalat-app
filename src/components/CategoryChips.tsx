import type { Category } from '../utils/contentTypes'

export default function CategoryChips({ categories }: { categories: Category[] }) {
  const labels: Record<Category, string> = {
    wajib: 'Wajib',
    sunnah: 'Sunnah',
    pendek: 'Pendek',
    panjang: 'Panjang',
  }
  return (
    <div className="chips">
      {categories.map((c) => (
        <span key={c} className="chip chip--subtle">
          {labels[c]}
        </span>
      ))}
    </div>
  )
}


