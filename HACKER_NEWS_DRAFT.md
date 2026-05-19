# Show HN Draft — react-n-design

## Title

**Show HN: react-n-design — a neomorphic React component library with AI chat, RSC, and zero config**

## Post body

I built **react-n-design**, a React component library with a soft, neomorphic visual style — think subtle shadows that make UI elements look like they are extruded from the surface rather than flat cards or glassmorphism. It is built with TypeScript and styled-components, and ships 40+ components ranging from buttons and modals to a full `AIChat` interface and a `CommandPalette` with fuzzy search and keyboard navigation.

A few things I am proud of:

- **AI chat out of the box.** The `AIChat` component handles streaming messages, Markdown rendering, typing indicators, and copy-to-clipboard actions. Drop it in, wire `onSend` to your LLM endpoint, and you are done.
- **Zero-config install.** All dependencies are bundled; `npm install react-n-design` and import. No extra styled-components or Framer Motion setup required.
- **Full React Server Component support.** Import from `react-n-design/rsc` in Next.js App Router without "use client" creeping into your layout. Client-only APIs are isolated behind the standard entry point.
- **Accessibility by default.** 41 tests cover the suite, and every component test runs `axe-core` to enforce zero WCAG violations. RTL, print styles, and touch-optimized hit targets are baked in.

Quick example:

```tsx
import { AIChat, ThemeContextProvider } from 'react-n-design';

function App() {
  return (
    <ThemeContextProvider>
      <AIChat
        messages={messages}
        onSend={(msg) => streamResponse(msg)}
        isLoading={isStreaming}
      />
    </ThemeContextProvider>
  );
}
```

I started this because I kept rebuilding the same neomorphic wrappers for side projects. It grew into something I hope other people find useful. If you try it, I would love feedback — or a PR. Star it, break it, and let me know what is missing.

**Live demo:** [Storybook](https://SoumyoNawab8.github.io/react-n-design/)  
**NPM:** `npm install react-n-design`  
**Repo:** [github.com/SoumyoNawab8/react-n-design](https://github.com/SoumyoNawab8/react-n-design)

---

## Tips for posting
- Post on a weekday morning (US Pacific time) for maximum developer traffic.
- Consider leaving the title exactly as drafted; "Show HN" + concrete keywords performs well.
- Respond to early comments quickly; HN ranks posts partly by engagement velocity.
