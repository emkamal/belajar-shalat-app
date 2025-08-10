import { useEffect, useState } from 'react'

export default function MediaPanel({ imageSrc, audioSrcArab, audioSrcLatin }: { imageSrc?: string; audioSrcArab?: string; audioSrcLatin?: string }) {
  const [imageOk, setImageOk] = useState<boolean>(true)

  useEffect(() => {
    if (!imageSrc) return
    const img = new Image()
    img.onload = () => setImageOk(true)
    img.onerror = () => setImageOk(false)
    img.src = imageSrc
  }, [imageSrc])

  const hasAny = imageSrc || audioSrcArab || audioSrcLatin
  if (!hasAny) return null

  return (
    <div className="section">
      {imageSrc && imageOk && (
        <div className="card section media-fallback">
          <img src={imageSrc} alt="Ilustrasi" className="media-img" />
        </div>
      )}
      {imageSrc && !imageOk && (
        <div className="card section media-fallback text-muted">Gambar tidak ditemukan.</div>
      )}

      {(audioSrcArab || audioSrcLatin) && (
        <div className="card section">
          {audioSrcArab && (
            <div className="section">
              <div className="small-title">Audio Arab</div>
              <audio controls preload="none" src={audioSrcArab} className="audio-full" />
            </div>
          )}
          {audioSrcLatin && (
            <div className="section">
              <div className="small-title">Audio Latin</div>
              <audio controls preload="none" src={audioSrcLatin} className="audio-full" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}


