# UI-DEN Governance & Architecture

> [!IMPORTANT]
> **Project Context**: UI-DEN is a premium analytical foundation. We prioritize "Aesthetic Performance"—fine-grained reactivity (SolidJS) paired with elite design (Glassmorphism). Every component must be reactive, theme-aware, and performant at 60fps.

## Agent Operational Guidelines
*   **Aesthetics**: Default to `backdrop-blur-xl`, `bg-surface/50`, and `duration-300`.
*   **Patterns**: Group related changes (Component + Logic + Sample) into atomic commits.
*   **Prompt Template**: Use "Implement `[ComponentName]` following the `ui-design` skill and include a `ComponentViewer` example."

---

## Technical Patterns

This document serves as the primary technical context for agents working on the UI-DEN project. Following these patterns ensures consistency and prevents architectural fragmentation.

## Core Tech Stack
- **Framework**: SolidJS (Fine-grained reactivity)
- **Meta-framework**: SolidStart (SSG + CSR hybrid)
- **Styling**: Tailwind CSS v4.0 (Custom configuration in `index.css`)
- **State**: Solid Signals with `localStorage` persistence
- **Icons**: Iconify (Icon data as JSON to minimize bundle size)

## State Management
File: `src/lib/store.ts`
- **Pattern**: Signals are exported directly from the store file.
- **Persistence**: A `createEffect` syncs settings to `localStorage`.
- **Hydration**: Uses a 50ms timeout for setting saved state to avoid SSR hydration mismatches.
- **Global Root**: Logic is wrapped in `createRoot` for cross-tab synchronization.

## Internationalization (i18n)
File: `src/lib/i18n.ts` & `src/lib/messages/`
- **Pattern**: Custom reactive `text()` function.
- **Adding a Language**:
  1. Create `src/lib/messages/[lang-CODE].ts`.
  2. Register in `src/lib/i18n.ts` (Import, add to `messages` object, and `LANGUAGES` array).
  3. Ensure flag icon exists in `src/lib/icons.ts`.

## Navigation System
File: `src/lib/navigation.tsx`
- **Pattern**: Centralized `TOP_NAV_ITEMS` and `SIDE_NAV_ITEMS` arrays.
- **Protected Routes**: Navigation items often check `isLoggedIn()` state (managed via standard routing if needed, but UI lists are static).

## Layout & Components
- **PageWrapper**: Every route should be wrapped in `PageWrapper` for consistent transitions and padding.
- **ProtectedLayout**: Injects `SideNav` and handles redirect if not logged in.
- **ComponentViewer**: Use `src/components/content/ComponentViewer.tsx` for creating interactive documentation. It takes a `title`, a `code` string, and rendered `children`.
- **Input Atoms**: Specialized components in `src/components/input/` (Slider, FilePicker, ColorPicker, DatePicker) follow a controlled pattern using `value` and `onChange/onInput` props.
- **Design Aesthetic**: Premium glassmorphism. Use `backdrop-blur`, `bg-surface/50`, and `shadow-md` frequently.

## Styling Rules
- Use **Tailwind v4** variables (e.g., `text-main`, `bg-nav`, `bg-surface`).
- Avoid hardcoded colors; use the theme-aware classes defined in `index.css`.
- Transitions should use `cubic-bezier(0.4, 0, 0.2, 1)` and `duration-300` for the premium feel.
- **Inputs**: Use the `Dropdown` with `searchable={true}` for large datasets to maintain UX quality.

## Geographical Data & Hierarchy
File: `src/lib/geoLoaders.ts` & `src/lib/hooks/useGeoFilter.ts`
- **Hook Pattern**: Use `useGeoFilter()` for any geographical selection UI. It handles:
  1. **URL Sync**: Automatically syncs filter state to `useSearchParams`.
  2. **Hierarchy Prediction**: Selecting a country automatically updates its parent Continent/Subcontinent.
  3. **Lazy Loading**: GeoJSON data is loaded via `import()` only when needed.
- **Utility Pattern**: Core geographical calculations (filtering, hierarchy lookup) must be kept pure in `src/lib/geoUtils.ts` and covered by Vitest in `*.test.ts`.

---

## Workflow Designer Architecture

A fully modular workflow designer system with designer, editor, runner, manager, and viewer capabilities.

### Directory Structure

```
src/
├── lib/workflow/
│   ├── types.ts          # All type definitions, node catalog, utilities
│   └── store.ts          # Reactive state management (legacy, now inline in designer.tsx)
│
├── components/workflow/
│   ├── index.ts              # Barrel exports
│   ├── WorkflowDesigner.tsx  # Main orchestrating component
│   ├── WorkflowCanvas.tsx    # Canvas with pan/zoom/selection
│   ├── WorkflowNode.tsx      # Node rendering with ports
│   ├── ConnectionRenderer.tsx # Bezier curve connections
│   ├── NodePalette.tsx       # Node library sidebar
│   ├── NodeProperties.tsx    # Node configuration panel
│   └── WorkflowToolbar.tsx   # Top toolbar with controls
│
└── routes/protected/workflow/
    ├── index.tsx         # Workflow list page
    ├── designer.tsx      # Full workflow editor
    └── viewer.tsx        # Read-only viewer
```

### Core Types (`types.ts`)

```typescript
// Node categories
type NodeCategory = 'trigger' | 'action' | 'logic' | 'transform' | 'output';

// Node status during execution
type NodeStatus = 'idle' | 'pending' | 'running' | 'success' | 'warning' | 'error' | 'skipped';

// Workflow node definition
interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  position: Position;
  status: NodeStatus;
  parameters: Record<string, any>;
  data?: any[];
  error?: string;
  disabled?: boolean;
  notes?: string;
}

// Connection between nodes
interface Connection {
  id: string;
  sourceNodeId: string;
  sourceOutputIndex: number;
  targetNodeId: string;
  targetInputIndex: number;
}

// Complete workflow definition
interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  variables: Record<string, any>;
  settings: WorkflowSettings;
  createdAt: number;
  updatedAt: number;
  version: number;
  tags?: string[];
}
```

### Node Catalog

18 built-in node types organized by category:

| Category | Nodes |
|----------|-------|
| Trigger | Webhook, Schedule, Manual |
| Action | HTTP Request, Database, Email |
| Logic | IF, Switch, Merge, Loop |
| Transform | Code, Set, Filter |
| Output | Slack, Discord, Google Sheets, Webhook Response |

Each node type defines:
- `inputs` / `outputs`: Port count
- `parameters`: Configurable fields with types
- `icon` / `color`: Visual styling

### State Management Pattern

The workflow store is created inline in `designer.tsx` using SolidJS stores:

```typescript
function createWorkflowStore(initialWorkflow?: Workflow) {
  const [workflow, setWorkflow] = createStore<Workflow>(...);
  const [canvas, setCanvas] = createStore<CanvasState>(...);
  const [history, setHistory] = createStore<{ past: any[]; future: any[] }>(...);
  
  // Methods: addNode, deleteNode, addConnection, undo, redo, executeWorkflow, etc.
  
  return { workflow, canvas, history, addNode, ... };
}
```

### Canvas Interaction

**Coordinate System:**
- Screen to Canvas: `(screenPos - offset) / zoom`
- Canvas to Screen: `canvasPos * zoom + offset`

**Pan/Zoom:**
- Scroll wheel: Pan canvas
- Ctrl + Scroll: Zoom in/out
- Middle mouse or Alt + drag: Pan

**Selection:**
- Click: Select single node
- Shift + Click: Additive selection
- Box selection: Drag on empty canvas
- Ctrl + A: Select all

### Connection Drawing

1. Mouse down on output port: Start connection draft
2. Mouse move: Update draft end position
3. Mouse up on input port: Create connection
4. Mouse up elsewhere: Cancel draft

Connections use cubic Bezier curves:
```typescript
function getBezierPath(x1, y1, x2, y2) {
  const cp = Math.max(Math.abs(x2 - x1) * 0.5, 50);
  return `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`;
}
```

### Execution Engine

Workflows execute from trigger nodes recursively:

```typescript
async function executeFromNode(nodeId, inputData) {
  const node = findNode(nodeId);
  updateNodeStatus(nodeId, 'running');
  
  // Simulate processing
  await delay(300 + random * 700);
  
  // Process based on node type
  let output = processNode(node, inputData);
  
  updateNodeStatus(nodeId, 'success', output);
  
  // Continue to connected nodes
  for (const conn of getOutgoingConnections(nodeId)) {
    await executeFromNode(conn.targetNodeId, output);
  }
}
```

### Storage

Workflows are persisted to localStorage:
- Key: `'workflows'`
- Value: `JSON.stringify(Workflow[])`
- Each save updates `updatedAt` timestamp

### Adding New Node Types

1. Add type definition to `NODE_CATALOG` in `types.ts`
2. Define parameters, inputs, outputs
3. Implement execution logic in `executeFromNode` if needed
4. Node automatically appears in palette
