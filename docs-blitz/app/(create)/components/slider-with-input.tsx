"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SliderWithInputProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label: string
  unit?: string
}

export function SliderWithInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  unit = "px",
}: SliderWithInputProps) {
  const [localValue, setLocalValue] = React.useState(value.toString())

  React.useEffect(() => {
    setLocalValue(value.toString())
  }, [value])

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value
      setLocalValue(raw)

      const parsed = Number.parseFloat(raw.replace(",", "."))
      if (Number.isNaN(parsed)) {
        return
      }

      onChange(Math.max(min, Math.min(max, parsed)))
    },
    [max, min, onChange]
  )

  const idBase = React.useMemo(() => label.replace(/\s+/g, "-").toLowerCase(), [label])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={`slider-${idBase}`} className="text-xs font-medium">
          {label}
        </Label>
        <div className="flex items-center gap-1">
          <Input
            id={`input-${idBase}`}
            type="number"
            value={localValue}
            onChange={handleInputChange}
            onBlur={() => setLocalValue(value.toString())}
            min={min}
            max={max}
            step={step}
            className="h-7 w-18 px-2 text-xs"
          />
          <span className="text-muted-foreground text-xs">{unit}</span>
        </div>
      </div>
      <Slider
        id={`slider-${idBase}`}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(nextValue) => {
          const sliderValue = nextValue[0]
          if (typeof sliderValue !== "number") {
            return
          }
          setLocalValue(sliderValue.toString())
          onChange(sliderValue)
        }}
      />
    </div>
  )
}
