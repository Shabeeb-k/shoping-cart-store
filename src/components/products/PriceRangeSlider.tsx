interface PriceRangeSliderProps {
  min: number
  max: number
  minValue: number
  maxValue: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export const PriceRangeSlider = ({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: PriceRangeSliderProps) => {
  const range = max - min

  const minPercentage =
    range === 0
      ? 0
      : ((minValue - min) / range) * 100

  const maxPercentage =
    range === 0
      ? 100
      : ((maxValue - min) / range) * 100

  const handleMinChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)

    if (value <= maxValue) {
      onMinChange(value)
    }
  }

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)

    if (value >= minValue) {
      onMaxChange(value)
    }
  }

  return (
    <div className="w-full">
      {/* Price values */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          Price
        </span>

        <span className="text-sm font-semibold text-slate-900">
          ${minValue.toFixed(2)} - $
          {maxValue.toFixed(2)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-6">
        {/* Background track */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />

        {/* Selected range */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-slate-900"
          style={{
            left: `${minPercentage}%`,
            right: `${100 - maxPercentage}%`,
          }}
        />

        {/* Minimum price slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          step="0.01"
          onChange={handleMinChange}
          className="price-range-slider absolute inset-0 w-full"
          aria-label="Minimum price"
        />

        {/* Maximum price slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          step="0.01"
          onChange={handleMaxChange}
          className="price-range-slider absolute inset-0 w-full"
          aria-label="Maximum price"
        />
      </div>

      {/* Min / Max labels */}
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>${min.toFixed(2)}</span>
        <span>${max.toFixed(2)}</span>
      </div>
    </div>
  )
}