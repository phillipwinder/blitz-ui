import { type Registry } from "shadcn/schema"

export const blitz-ui: Registry["items"] = [
  {
    "name": "alert",
    "type": "registry:ui",
    "title": "Alert",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/alert.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/alert.tsx"
      }
    ],
    "cssVars": {
      "light": {
        "destructive-foreground": "var(--color-red-800)",
        "success": "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-900)",
        "info": "var(--color-violet-500)",
        "info-foreground": "var(--color-violet-900)",
        "warning": "var(--color-yellow-500)",
        "warning-foreground": "var(--color-yellow-900)",
        "invert": "var(--color-zinc-900)",
        "invert-foreground": "var(--color-zinc-50)"
      },
      "dark": {
        "destructive-foreground": "var(--color-red-600)",
        "success": "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-600)",
        "info": "var(--color-violet-500)",
        "info-foreground": "var(--color-violet-600)",
        "warning": "var(--color-yellow-500)",
        "warning-foreground": "var(--color-yellow-600)",
        "invert": "var(--color-zinc-700)",
        "invert-foreground": "var(--color-zinc-50)"
      }
    }
  },
  {
    "name": "autocomplete",
    "type": "registry:ui",
    "title": "Autocomplete",
    "description": "",
    "registryDependencies": [
      "scroll-area"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/autocomplete.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/autocomplete.tsx"
      }
    ]
  },
  {
    "name": "badge",
    "type": "registry:ui",
    "title": "Badge",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "class-variance-authority",
      "radix-ui"
    ],
    "files": [
      {
        "path": "blitz-ui/badge.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/badge.tsx"
      }
    ],
    "cssVars": {
      "light": {
        "destructive-foreground": "var(--color-red-800)",
        "success": "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-900)",
        "info": "var(--color-violet-500)",
        "info-foreground": "var(--color-violet-900)",
        "warning": "var(--color-yellow-500)",
        "warning-foreground": "var(--color-yellow-900)",
        "invert": "var(--color-zinc-900)",
        "invert-foreground": "var(--color-zinc-50)"
      },
      "dark": {
        "destructive-foreground": "var(--color-red-600)",
        "success": "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-600)",
        "info": "var(--color-violet-500)",
        "info-foreground": "var(--color-violet-600)",
        "warning": "var(--color-yellow-500)",
        "warning-foreground": "var(--color-yellow-600)",
        "invert": "var(--color-zinc-700)",
        "invert-foreground": "var(--color-zinc-50)"
      }
    }
  },
  {
    "name": "data-grid-column-filter",
    "type": "registry:ui",
    "title": "Data Grid Column Filter",
    "description": "",
    "registryDependencies": [
      "badge",
      "button",
      "input",
      "popover",
      "separator"
    ],
    "dependencies": [
      "@tanstack/react-table"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-column-filter.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-column-filter.tsx"
      }
    ]
  },
  {
    "name": "data-grid-column-header",
    "type": "registry:ui",
    "title": "Data Grid Column Header",
    "description": "",
    "registryDependencies": [
      "button",
      "dropdown-menu"
    ],
    "dependencies": [
      "@tanstack/react-table"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-column-header.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-column-header.tsx"
      }
    ]
  },
  {
    "name": "data-grid-column-visibility",
    "type": "registry:ui",
    "title": "Data Grid Column Visibility",
    "description": "",
    "registryDependencies": [
      "dropdown-menu"
    ],
    "dependencies": [
      "@tanstack/react-table"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-column-visibility.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-column-visibility.tsx"
      }
    ]
  },
  {
    "name": "data-grid-pagination",
    "type": "registry:ui",
    "title": "Data Grid Pagination",
    "description": "",
    "registryDependencies": [
      "button",
      "select",
      "skeleton"
    ],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-pagination.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-pagination.tsx"
      }
    ]
  },
  {
    "name": "data-grid-table-dnd-rows",
    "type": "registry:ui",
    "title": "Data Grid Table Dnd Rows",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-table-dnd-rows.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-table-dnd-rows.tsx"
      }
    ]
  },
  {
    "name": "data-grid-table-dnd",
    "type": "registry:ui",
    "title": "Data Grid Table Dnd",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-table-dnd.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-table-dnd.tsx"
      }
    ]
  },
  {
    "name": "data-grid-table",
    "type": "registry:ui",
    "title": "Data Grid Table",
    "description": "",
    "registryDependencies": [
      "checkbox"
    ],
    "dependencies": [
      "@tanstack/react-table",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-table.tsx",
        "type": "registry:ui",
        "target": "component/blitz-ui/data-grid/data-grid-table.tsx"
      }
    ]
  },
  {
    "name": "data-grid",
    "type": "registry:ui",
    "title": "Data Grid",
    "description": "",
    "registryDependencies": [
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "input",
      "popover",
      "select",
      "separator",
      "skeleton"
    ],
    "dependencies": [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/data-grid/data-grid-column-filter.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-column-filter.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-column-header.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-column-header.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-column-visibility.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-column-visibility.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-pagination.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-pagination.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-table-dnd-rows.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-table-dnd-rows.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-table-dnd.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-table-dnd.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid-table.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid-table.tsx"
      },
      {
        "path": "blitz-ui/data-grid/data-grid.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid/data-grid.tsx"
      }
    ]
  },
  {
    "name": "data-grid-pagination",
    "type": "registry:ui",
    "title": "Data Grid Pagination",
    "description": "",
    "registryDependencies": [
      "button",
      "select",
      "skeleton"
    ],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/data-grid-pagination.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/data-grid-pagination.tsx"
      }
    ]
  },
  {
    "name": "date-selector",
    "type": "registry:ui",
    "title": "Date Selector",
    "description": "",
    "registryDependencies": [
      "button",
      "calendar",
      "input",
      "scroll-area",
      "tabs",
      "use-mobile"
    ],
    "dependencies": [
      "date-fns",
      "react-day-picker"
    ],
    "files": [
      {
        "path": "blitz-ui/date-selector.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/date-selector.tsx"
      }
    ]
  },
  {
    "name": "filters",
    "type": "registry:ui",
    "title": "Filters",
    "description": "",
    "registryDependencies": [
      "button",
      "button-group",
      "dropdown-menu",
      "input",
      "input-group",
      "kbd",
      "scroll-area",
      "tooltip"
    ],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/filters.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/filters.tsx"
      }
    ]
  },
  {
    "name": "frame",
    "type": "registry:ui",
    "title": "Frame",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/frame.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/frame.tsx"
      }
    ]
  },
  {
    "name": "kanban",
    "type": "registry:ui",
    "title": "Kanban",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "radix-ui"
    ],
    "files": [
      {
        "path": "blitz-ui/kanban.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/kanban.tsx"
      }
    ]
  },
  {
    "name": "number-field",
    "type": "registry:ui",
    "title": "Number Field",
    "description": "",
    "registryDependencies": [
      "label"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/number-field.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/number-field.tsx"
      }
    ]
  },
  {
    "name": "phone-input",
    "type": "registry:ui",
    "title": "Phone Input",
    "description": "",
    "registryDependencies": [
      "button",
      "combobox",
      "input",
      "scroll-area"
    ],
    "dependencies": [
      "react-phone-number-input"
    ],
    "files": [
      {
        "path": "blitz-ui/phone-input.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/phone-input.tsx"
      }
    ]
  },
  {
    "name": "rating",
    "type": "registry:ui",
    "title": "Rating",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/rating.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/rating.tsx"
      }
    ]
  },
  {
    "name": "scrollspy",
    "type": "registry:ui",
    "title": "Scrollspy",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/scrollspy.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/scrollspy.tsx"
      }
    ]
  },
  {
    "name": "sortable",
    "type": "registry:ui",
    "title": "Sortable",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "radix-ui"
    ],
    "files": [
      {
        "path": "blitz-ui/sortable.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/sortable.tsx"
      }
    ]
  },
  {
    "name": "stepper",
    "type": "registry:ui",
    "title": "Stepper",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/stepper.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/stepper.tsx"
      }
    ]
  },
  {
    "name": "timeline",
    "type": "registry:ui",
    "title": "Timeline",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "radix-ui"
    ],
    "files": [
      {
        "path": "blitz-ui/timeline.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/timeline.tsx"
      }
    ]
  },
  {
    "name": "tree",
    "type": "registry:ui",
    "title": "Tree",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@headless-tree/core",
      "radix-ui"
    ],
    "files": [
      {
        "path": "blitz-ui/tree.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/tree.tsx"
      }
    ]
  }
]
