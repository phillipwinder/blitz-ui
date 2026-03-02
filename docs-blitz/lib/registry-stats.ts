import stats from "@/registry-blitz-ui/bases/registry.json"
import { normalizeSlug } from "@/lib/utils"

export interface CategoryInfo {
  name: string
  label: string
  description: string
  count: number
}

interface RegistryStatsData {
  categories: CategoryInfo[]
  totalPatterns: number
}

function getStats(): RegistryStatsData {
  return stats as RegistryStatsData
}

export function getCategories(): CategoryInfo[] {
  return getStats().categories
}

export function getCategoryNames(): string[] {
  return getStats().categories.map((c) => c.name)
}

export function getPatternsTotalCount(): number {
  return getStats().totalPatterns
}

export function getPatternCountByCategory(category: string): number {
  const normalized = normalizeSlug(category)
  const cat = getStats().categories.find((c) => c.name === normalized)
  return cat?.count ?? 0
}

export function getCategoryDescription(category: string): string | undefined {
  const normalized = normalizeSlug(category)
  const cat = getStats().categories.find((c) => c.name === normalized)
  return cat?.description
}

export function isValidCategory(category: string): boolean {
  const normalized = normalizeSlug(category)
  return getStats().categories.some((c) => c.name === normalized)
}
