import { type Registry } from "shadcn/schema"

export const blitz-ui: Registry["items"] = [
  {
    "name": "accordion",
    "type": "registry:ui",
    "title": "Accordion",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/accordion.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/accordion.tsx"
      }
    ]
  },
  {
    "name": "alert-dialog",
    "type": "registry:ui",
    "title": "Alert Dialog",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/alert-dialog.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/alert-dialog.tsx"
      }
    ]
  },
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
    "name": "aspect-ratio",
    "type": "registry:ui",
    "title": "Aspect Ratio",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/aspect-ratio.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/aspect-ratio.tsx"
      }
    ]
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
    "name": "avatar",
    "type": "registry:ui",
    "title": "Avatar",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/avatar.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/avatar.tsx"
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
      "@base-ui/react",
      "class-variance-authority"
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
    "name": "breadcrumb",
    "type": "registry:ui",
    "title": "Breadcrumb",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/breadcrumb.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/breadcrumb.tsx"
      }
    ]
  },
  {
    "name": "button-group",
    "type": "registry:ui",
    "title": "Button Group",
    "description": "",
    "registryDependencies": [
      "separator"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/button-group.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/button-group.tsx"
      }
    ]
  },
  {
    "name": "button",
    "type": "registry:ui",
    "title": "Button",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/button.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/button.tsx"
      }
    ]
  },
  {
    "name": "calendar",
    "type": "registry:ui",
    "title": "Calendar",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "react-day-picker"
    ],
    "files": [
      {
        "path": "blitz-ui/calendar.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/calendar.tsx"
      }
    ]
  },
  {
    "name": "card",
    "type": "registry:ui",
    "title": "Card",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/card.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/card.tsx"
      }
    ]
  },
  {
    "name": "carousel",
    "type": "registry:ui",
    "title": "Carousel",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "embla-carousel-react"
    ],
    "files": [
      {
        "path": "blitz-ui/carousel.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/carousel.tsx"
      }
    ]
  },
  {
    "name": "checkbox",
    "type": "registry:ui",
    "title": "Checkbox",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/checkbox.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/checkbox.tsx"
      }
    ]
  },
  {
    "name": "collapsible",
    "type": "registry:ui",
    "title": "Collapsible",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/collapsible.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/collapsible.tsx"
      }
    ]
  },
  {
    "name": "combobox",
    "type": "registry:ui",
    "title": "Combobox",
    "description": "",
    "registryDependencies": [
      "button",
      "input-group"
    ],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/combobox.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/combobox.tsx"
      }
    ]
  },
  {
    "name": "command",
    "type": "registry:ui",
    "title": "Command",
    "description": "",
    "registryDependencies": [
      "dialog",
      "input-group"
    ],
    "dependencies": [
      "cmdk"
    ],
    "files": [
      {
        "path": "blitz-ui/command.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/command.tsx"
      }
    ]
  },
  {
    "name": "context-menu",
    "type": "registry:ui",
    "title": "Context Menu",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/context-menu.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/context-menu.tsx"
      }
    ]
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
    "name": "dialog",
    "type": "registry:ui",
    "title": "Dialog",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/dialog.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/dialog.tsx"
      }
    ]
  },
  {
    "name": "drawer",
    "type": "registry:ui",
    "title": "Drawer",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "vaul"
    ],
    "files": [
      {
        "path": "blitz-ui/drawer.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/drawer.tsx"
      }
    ]
  },
  {
    "name": "dropdown-menu",
    "type": "registry:ui",
    "title": "Dropdown Menu",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/dropdown-menu.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/dropdown-menu.tsx"
      }
    ]
  },
  {
    "name": "empty",
    "type": "registry:ui",
    "title": "Empty",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/empty.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/empty.tsx"
      }
    ]
  },
  {
    "name": "field",
    "type": "registry:ui",
    "title": "Field",
    "description": "",
    "registryDependencies": [
      "label",
      "separator"
    ],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/field.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/field.tsx"
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
      "@base-ui/react",
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
    "name": "form-tanstack",
    "type": "registry:ui",
    "title": "Form Tanstack",
    "description": "",
    "registryDependencies": [
      "label"
    ],
    "dependencies": [
      "@base-ui/react",
      "@tanstack/react-form"
    ],
    "files": [
      {
        "path": "blitz-ui/form-tanstack.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/form-tanstack.tsx"
      }
    ]
  },
  {
    "name": "form",
    "type": "registry:ui",
    "title": "Form",
    "description": "",
    "registryDependencies": [
      "label"
    ],
    "dependencies": [
      "@base-ui/react",
      "react-hook-form"
    ],
    "files": [
      {
        "path": "blitz-ui/form.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/form.tsx"
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
    "name": "hover-card",
    "type": "registry:ui",
    "title": "Hover Card",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/hover-card.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/hover-card.tsx"
      }
    ]
  },
  {
    "name": "input-group",
    "type": "registry:ui",
    "title": "Input Group",
    "description": "",
    "registryDependencies": [
      "button",
      "input",
      "textarea"
    ],
    "dependencies": [
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/input-group.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/input-group.tsx"
      }
    ]
  },
  {
    "name": "input-otp",
    "type": "registry:ui",
    "title": "Input Otp",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "input-otp"
    ],
    "files": [
      {
        "path": "blitz-ui/input-otp.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/input-otp.tsx"
      }
    ]
  },
  {
    "name": "input",
    "type": "registry:ui",
    "title": "Input",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/input.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/input.tsx"
      }
    ]
  },
  {
    "name": "item",
    "type": "registry:ui",
    "title": "Item",
    "description": "",
    "registryDependencies": [
      "separator"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/item.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/item.tsx"
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
      "@base-ui/react",
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities"
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
    "name": "kbd",
    "type": "registry:ui",
    "title": "Kbd",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/kbd.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/kbd.tsx"
      }
    ]
  },
  {
    "name": "label",
    "type": "registry:ui",
    "title": "Label",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/label.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/label.tsx"
      }
    ]
  },
  {
    "name": "menu",
    "type": "registry:ui",
    "title": "Menu",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/menu.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/menu.tsx"
      }
    ]
  },
  {
    "name": "menubar",
    "type": "registry:ui",
    "title": "Menubar",
    "description": "",
    "registryDependencies": [
      "dropdown-menu"
    ],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/menubar.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/menubar.tsx"
      }
    ]
  },
  {
    "name": "native-select",
    "type": "registry:ui",
    "title": "Native Select",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/native-select.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/native-select.tsx"
      }
    ]
  },
  {
    "name": "navigation-menu",
    "type": "registry:ui",
    "title": "Navigation Menu",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/navigation-menu.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/navigation-menu.tsx"
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
    "name": "pagination",
    "type": "registry:ui",
    "title": "Pagination",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/pagination.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/pagination.tsx"
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
    "name": "popover",
    "type": "registry:ui",
    "title": "Popover",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/popover.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/popover.tsx"
      }
    ]
  },
  {
    "name": "preview-card",
    "type": "registry:ui",
    "title": "Preview Card",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/preview-card.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/preview-card.tsx"
      }
    ]
  },
  {
    "name": "progress",
    "type": "registry:ui",
    "title": "Progress",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/progress.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/progress.tsx"
      }
    ]
  },
  {
    "name": "radio-group",
    "type": "registry:ui",
    "title": "Radio Group",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/radio-group.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/radio-group.tsx"
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
    "name": "resizable",
    "type": "registry:ui",
    "title": "Resizable",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "react-resizable-panels"
    ],
    "files": [
      {
        "path": "blitz-ui/resizable.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/resizable.tsx"
      }
    ]
  },
  {
    "name": "scroll-area",
    "type": "registry:ui",
    "title": "Scroll Area",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/scroll-area.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/scroll-area.tsx"
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
    "name": "select",
    "type": "registry:ui",
    "title": "Select",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/select.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/select.tsx"
      }
    ]
  },
  {
    "name": "separator",
    "type": "registry:ui",
    "title": "Separator",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/separator.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/separator.tsx"
      }
    ]
  },
  {
    "name": "sheet",
    "type": "registry:ui",
    "title": "Sheet",
    "description": "",
    "registryDependencies": [
      "button"
    ],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/sheet.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/sheet.tsx"
      }
    ]
  },
  {
    "name": "sidebar",
    "type": "registry:ui",
    "title": "Sidebar",
    "description": "",
    "registryDependencies": [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip",
      "use-mobile"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/sidebar.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/sidebar.tsx"
      }
    ]
  },
  {
    "name": "skeleton",
    "type": "registry:ui",
    "title": "Skeleton",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/skeleton.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/skeleton.tsx"
      }
    ]
  },
  {
    "name": "slider",
    "type": "registry:ui",
    "title": "Slider",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/slider.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/slider.tsx"
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
      "@base-ui/react",
      "@dnd-kit/core",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities"
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
    "name": "spinner",
    "type": "registry:ui",
    "title": "Spinner",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/spinner.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/spinner.tsx"
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
    "name": "switch",
    "type": "registry:ui",
    "title": "Switch",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/switch.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/switch.tsx"
      }
    ]
  },
  {
    "name": "table",
    "type": "registry:ui",
    "title": "Table",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/table.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/table.tsx"
      }
    ]
  },
  {
    "name": "tabs",
    "type": "registry:ui",
    "title": "Tabs",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/tabs.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/tabs.tsx"
      }
    ]
  },
  {
    "name": "textarea",
    "type": "registry:ui",
    "title": "Textarea",
    "description": "",
    "registryDependencies": [],
    "dependencies": [],
    "files": [
      {
        "path": "blitz-ui/textarea.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/textarea.tsx"
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
      "@base-ui/react"
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
    "name": "toggle-group",
    "type": "registry:ui",
    "title": "Toggle Group",
    "description": "",
    "registryDependencies": [
      "toggle"
    ],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/toggle-group.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/toggle-group.tsx"
      }
    ]
  },
  {
    "name": "toggle",
    "type": "registry:ui",
    "title": "Toggle",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react",
      "class-variance-authority"
    ],
    "files": [
      {
        "path": "blitz-ui/toggle.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/toggle.tsx"
      }
    ]
  },
  {
    "name": "tooltip",
    "type": "registry:ui",
    "title": "Tooltip",
    "description": "",
    "registryDependencies": [],
    "dependencies": [
      "@base-ui/react"
    ],
    "files": [
      {
        "path": "blitz-ui/tooltip.tsx",
        "type": "registry:ui",
        "target": "components/blitz-ui/tooltip.tsx"
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
      "@base-ui/react",
      "@headless-tree/core"
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
