import { useState } from 'react'

type DalilItem = { sumber?: string; teks: string }

export default function InfoPanel({
  makna,
  dalil,
  catatanFiqih,
}: {
  makna?: string
  dalil?: string | DalilItem[]
  catatanFiqih?: string
}) {
  const [open, setOpen] = useState(false)
  if (!makna && !dalil && !catatanFiqih) return null
  return (
    <div className="section">
      <button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-text">
        {open ? 'Sembunyikan penjelasan' : 'Tampilkan penjelasan'}
      </button>
      {open && (
        <div className="card section">
          {makna && <p className="no-top-margin">{makna}</p>}

          {/* Dalil can be a string or a list */}
          {typeof dalil === 'string' && dalil && (
            <p className="text-muted">Dalil: {dalil}</p>
          )}
          {Array.isArray(dalil) && dalil.length > 0 && (
            <div className="section dalil-list">
              <h4 className="small-title">Dalil</h4>
              <ol className="list-reset dalil-ol">
                {dalil.map((d, i) => (
                  <li key={i} className="dalil-item">
                    <div className="dalil-badge">{i + 1}</div>
                    <div className="dalil-text">
                      {d.sumber && <div className="dalil-source">{d.sumber}</div>}
                      <blockquote>{d.teks}</blockquote>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {catatanFiqih && (
            <div className="section">
              <h4 className="small-title">Catatan Fikih</h4>
              <p className="text-muted">{catatanFiqih}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


