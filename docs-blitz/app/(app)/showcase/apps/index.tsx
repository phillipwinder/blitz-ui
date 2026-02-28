"use client"

import * as React from "react"
import { PlusIcon, TrashIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export type ShowcaseRenderer = {
  label: string
  description: string
  component: React.ComponentType
}

type SprintTask = {
  id: string
  label: string
  done: boolean
}

function FocusSprintApp() {
  const [taskName, setTaskName] = React.useState("")
  const [tasks, setTasks] = React.useState<SprintTask[]>([
    { id: "scope", label: "Define sprint scope", done: true },
    { id: "tickets", label: "Break work into tickets", done: false },
    { id: "review", label: "Prepare review checklist", done: false },
  ])

  const completed = tasks.filter((task) => task.done).length
  const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Sprint</CardTitle>
        <CardDescription>
          Capture a sprint, track done items, and keep momentum visible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            placeholder="Add a sprint task"
          />
          <Button
            onClick={() => {
              const label = taskName.trim()
              if (!label) return
              setTasks((prev) => [...prev, { id: crypto.randomUUID(), label, done: false }])
              setTaskName("")
            }}
            type="button"
            size="sm"
          >
            <PlusIcon />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <label key={task.id} className="flex items-center gap-3 rounded-md border p-3">
              <Checkbox
                checked={task.done}
                onCheckedChange={(checked) => {
                  setTasks((prev) =>
                    prev.map((item) =>
                      item.id === task.id ? { ...item, done: Boolean(checked) } : item
                    )
                  )
                }}
              />
              <span
                className={task.done ? "text-muted-foreground line-through" : "text-foreground"}
              >
                {task.label}
              </span>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>
              {completed} / {tasks.length} complete
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => setTasks((prev) => prev.filter((task) => !task.done))}
          disabled={completed === 0}
        >
          <TrashIcon />
          Clear Completed
        </Button>
      </CardContent>
    </Card>
  )
}

type Expense = {
  id: string
  title: string
  amount: number
}

function TripSplitterApp() {
  const [title, setTitle] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [people, setPeople] = React.useState(3)
  const [expenses, setExpenses] = React.useState<Expense[]>([
    { id: "hotel", title: "Hotel", amount: 240 },
    { id: "fuel", title: "Fuel", amount: 64.5 },
  ])

  const total = expenses.reduce((sum, item) => sum + item.amount, 0)
  const each = people > 0 ? total / people : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Splitter</CardTitle>
        <CardDescription>
          Drop in shared costs and split totals per person in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-[1fr_160px_100px]">
          <Input
            placeholder="Expense name"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
            min={0}
            step="0.01"
          />
          <Button
            type="button"
            onClick={() => {
              const parsed = Number.parseFloat(amount)
              if (!title.trim() || Number.isNaN(parsed) || parsed <= 0) return
              setExpenses((prev) => [
                ...prev,
                { id: crypto.randomUUID(), title: title.trim(), amount: parsed },
              ])
              setTitle("")
              setAmount("")
            }}
          >
            <PlusIcon />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {expenses.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md border p-3 text-sm"
            >
              <span className="font-medium">{item.title}</span>
              <span className="text-muted-foreground">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Card className="gap-3 py-4">
            <CardContent className="space-y-1 px-4">
              <div className="text-muted-foreground text-xs uppercase">Group Size</div>
              <Input
                value={String(people)}
                onChange={(event) => {
                  const next = Number.parseInt(event.target.value, 10)
                  if (Number.isNaN(next)) {
                    setPeople(1)
                    return
                  }
                  setPeople(Math.max(1, next))
                }}
                type="number"
                min={1}
              />
            </CardContent>
          </Card>
          <Card className="gap-3 py-4">
            <CardContent className="space-y-1 px-4">
              <div className="text-muted-foreground text-xs uppercase">Per Person</div>
              <div className="text-2xl font-semibold">${each.toFixed(2)}</div>
              <div className="text-muted-foreground text-xs">Total: ${total.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

function toHex(value: number) {
  return value.toString(16).padStart(2, "0").toUpperCase()
}

function PaletteLabApp() {
  const [r, setR] = React.useState(56)
  const [g, setG] = React.useState(102)
  const [b, setB] = React.useState(164)
  const [saved, setSaved] = React.useState<string[]>(["#1E293B", "#10B981"])

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Palette Lab</CardTitle>
        <CardDescription>
          Mix channels, preview the color, and save swatches for later.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-28 rounded-lg border" style={{ backgroundColor: hex }} />

        <div className="space-y-3">
          <label className="grid gap-2 text-sm">
            <span className="text-muted-foreground">Red: {r}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={r}
              onChange={(event) => setR(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-muted-foreground">Green: {g}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={g}
              onChange={(event) => setG(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-muted-foreground">Blue: {b}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={b}
              onChange={(event) => setB(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="flex items-center justify-between rounded-md border p-3 text-sm">
          <span className="text-muted-foreground">Current HEX</span>
          <span className="font-semibold">{hex}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={() => {
              setSaved((prev) => (prev.includes(hex) ? prev : [hex, ...prev]))
            }}
          >
            Save Swatch
          </Button>
          {saved.map((swatch) => (
            <Badge key={swatch} variant="outline" className="gap-2 px-2 py-1">
              <span className="size-2 rounded-full border" style={{ backgroundColor: swatch }} />
              {swatch}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const showcaseRenderers: Record<string, ShowcaseRenderer> = {
  "focus-sprint": {
    label: "Focus Sprint",
    description: "A tiny task sprint board with completion tracking.",
    component: FocusSprintApp,
  },
  "trip-splitter": {
    label: "Trip Splitter",
    description: "Shared trip expense calculator for small groups.",
    component: TripSplitterApp,
  },
  "palette-lab": {
    label: "Palette Lab",
    description: "Interactive RGB mixer with quick swatch previews.",
    component: PaletteLabApp,
  },
}
