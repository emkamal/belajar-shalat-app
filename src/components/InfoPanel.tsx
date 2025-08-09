import { useState } from 'react'

export default function InfoPanel({ makna, dalil }: { makna?: string; dalil?: string }) {
  const [open, setOpen] = useState(false)
  if (!makna && !dalil) return null
  return (
    <div className="section">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-text"
        aria-expanded={open}
      >
        {open ? 'Sembunyikan penjelasan' : 'Tampilkan penjelasan'}
      </button>
      {open && (
        <div className="card section">
          {makna && <p style={{ marginTop: 0 }}>{makna}</p>}
          {dalil && <p className="text-muted">Dalil: {dalil}</p>}
        </div>
      )}
    </div>
  )
}


