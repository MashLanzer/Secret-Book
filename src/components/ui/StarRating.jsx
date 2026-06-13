export default function StarRating({ value = 0, onChange, size = 24, readOnly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star === value ? 0 : star)}
          className={`transition-all duration-150 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
          style={{ fontSize: size }}
        >
          <span className={star <= value ? 'star-filled' : 'star-empty'}>★</span>
        </button>
      ))}
    </div>
  )
}
