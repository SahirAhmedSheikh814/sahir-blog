'use client'

import { cn } from "@/lib/utils"

interface CategoriesProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  const categories = [
    { label: "All", value: "all" },
    { label: "Traveling", value: "traveling" },
    { label: "Technology", value: "technology" },
    { label: "Cricket", value: "cricket" },
  ]

  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            "text-lg font-medium transition-colors hover:text-primary",
            activeCategory === category.value
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

