export default function Illustration({ file, alt }: { file: string; alt?: string }) {
  return (
    <img
      src={`/illustrations/${file}`}
      alt={alt ?? 'Ilustrasi gerakan shalat'}
      loading="lazy"
      style={{ maxWidth: '100%', borderRadius: 'var(--radius-sm)' }}
    />
  )
}


