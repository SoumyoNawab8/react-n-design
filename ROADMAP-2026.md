# react-n-design 2026 Strategic Plan

**Vision:** Become the default UI kit for AI-powered applications — the design system developers reach for first when building LLM chatbots, agent frameworks, and AI-native products.

---

## 1. Component Strategy — Own the AI App Era

The #1 opportunity in 2026 is that every app is becoming AI-powered, but no design system truly owns this space. shadcn/ui is generic. MUI is enterprise-bureaucratic. **react-n-design can become the default UI kit for AI applications.**

### New Components to Add

| Component | Why It Matters in 2026 |
|---|---|
| `StreamingText` | Typewriter effect with Markdown, code blocks, and citations — the core of every LLM UI. Currently missing. |
| `ThinkingBlock` | Visualize LLM reasoning/thought chains (like Claude's artifacts or DeepSeek's reasoning). Collapsible, timestamped. |
| `ToolCallCard` | Show when the AI calls tools (search, calculator, API calls) with loading → result states. |
| `PromptBuilder` | Few-shot example editor with drag-to-reorder, variable injection (`{{user_input}}`), and version tabs. |
| `ModelSelector` | Dropdown with model logos, context window sizes, pricing per 1K tokens, and latency badges. |
| `DiffViewer` | Side-by-side or inline diff for AI-generated code reviews, document edits, or version comparison. |
| `AttachmentZone` | Drag-and-drop for images, PDFs, audio with preview thumbnails and upload progress. |
| `MentionInput` | `@` mentions for tagging users, referencing documents, or triggering agents inside text inputs. |
| `KanbanBoard` | Drag-and-drop task board. Every AI agent framework (LangGraph, CrewAI) needs task visualization. |
| `RichTextEditor` | Tiptap-style editor but neomorphic — essential for AI content apps. |
| `Terminal` | Styled shell output for AI code execution, CLI tools, or log streaming. |
| `HeatmapCalendar` | GitHub-style contribution calendar — great for analytics dashboards. |
| `AudioWaveform` | Voice input/output visualization for speech-to-text apps. |
| `OTPInput` / `PinInput` | Standard auth components, currently missing. |
| `OrgChart` | Hierarchical tree diagram — useful for agent hierarchies and team structures. |
| `ImageGallery` | Masonry grid with lightbox, zoom, and lazy loading. |
| `GanttChart` | Project timeline — every AI project management tool needs this. |

---

## 2. Visual Evolution — Beyond Neumorphism

Neumorphism is the signature, but pure neumorphism feels like 2020. It needs to evolve:

| Direction | Implementation |
|---|---|
| **Glassmorphic variants** | Add `variant="glass"` to Card, Modal, Drawer with `backdrop-filter: blur()` and subtle borders. This is what modern AI apps (ChatGPT, Claude, Perplexity) use. |
| **Gradient borders** | Animated `conic-gradient` borders for "AI is thinking" states or premium CTAs. |
| **Micro-interactions** | Spring physics on every interaction via `framer-motion`. Buttons should feel tactile — they press *in*. |
| **Rich dark mode** | Don't just invert colors. Use deep space blues (`#0f172a`) with subtle inner glows. Dark mode should feel like a premium IDE. |
| **CSS variable theming** | Move from styled-components objects to CSS custom properties. Enables runtime theme switching without re-render and makes customization trivial for users. |
| **Variable font support** | Use a single variable font file (like Inter or Geist) for all weights instead of loading multiple font files. |

---

## 3. Developer Experience — The shadcn/ui Killer

shadcn/ui won because of **copy-paste + full control**. react-n-design needs to match and exceed that:

| Feature | What to Build |
|---|---|
| `npx react-n-design add` | Already exists, but needs to scaffold into the user's project with full source (like shadcn), not just npm install. |
| `npx react-n-design init` | One command to set up Tailwind-compatible CSS variables, fonts, and theme provider. |
| **VS Code Extension** | Type `rnd-Button` → get full import + props autocompletion. Show component preview in hover. |
| **Figma Plugin** | Designers copy from Figma, paste as JSX. Bidirectional sync. |
| **Auto-import Vite/Webpack plugin** | `import { Button }` automatically resolves to the correct sub-path for optimal tree-shaking. |
| **Theme Studio** | Web UI to visually tweak colors, spacing, radius → exports `theme.ts` or CSS variables. |
| **Component Playground** | Each component page on the docs site should be a live playground with prop toggles (like Radix or MUI docs). |

---

## 4. Performance & Modern React

| Initiative | Impact |
|---|---|
| **React Compiler ready** | Ensure all components are memo-safe and follow React 19 best practices. |
| **Bundle diet** | 5.5MB unpacked is too heavy. Split into `@react-n-design/core` + `@react-n-design/ai` + `@react-n-design/charts`. |
| **Zero-JS static components** | For RSC, ship pure CSS/HTML components where possible (Badge, Divider, Skeleton). |
| **Virtualization by default** | Table, Select, ComboBox should virtualize automatically when lists exceed 50 items. |
| **Font subsetting** | Ship only the icon SVGs that are used. Current inline icons are good, but tree-shake them. |

---

## 5. The Ecosystem Play

| Integration | Why |
|---|---|
| **LangChain / Vercel AI SDK** | Official adapters so `AIChat` works with `useChat()` out of the box. |
| **Next.js App Router** | Deep RSC integration — server-render static shells, hydrate interactivity. |
| **tRPC / GraphQL** | Form components with built-in mutation handling and optimistic updates. |
| **Zod** | Form validation with Zod schemas natively supported. |
| **React Hook Form** | Optional adapter for users who prefer RHF over built-in form state. |

---

## 6. The Narrative — "The Design System for the AI Age"

Marketing story:

> "Every UI library gives you buttons. react-n-design gives you the UI patterns for building AI-powered applications — streaming LLM responses, agent tool loops, prompt engineering interfaces, and reasoning visualizations — all with a tactile, modern design language that feels alive."

**The 2026 goal:** Be the first search result for:
- "react UI kit for AI chatbot"
- "react components for LLM apps"
- "react design system for agents"

---

## Immediate Priority Order

| Phase | Focus | Timeframe |
|---|---|---|
| **1. Hotfix** | Fix all pre-existing test failures, stabilize CI | This week |
| **2. AI Components** | `StreamingText`, `ThinkingBlock`, `ToolCallCard`, `PromptBuilder` | Next 2 weeks |
| **3. DX** | VS Code extension, `init` CLI command, CSS variable theming | Month 2 |
| **4. Visual Refresh** | Glassmorphism, gradient borders, richer dark mode | Month 2-3 |
| **5. Ecosystem** | Vercel AI SDK integration, Zod form validation | Month 3 |
| **6. Scale** | Component playground docs, Figma kit, bundle splitting | Month 4 |

---

*Generated 2026-05-31. This document is intentionally kept out of version control — it is a living local strategy document.*
