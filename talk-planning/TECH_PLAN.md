# Technical Plan

## Stack

- SvelteKit
- Static deployment through GitHub Pages
- Single-page presentation route
- Local assets in `static/images` and `static/video`

## Interaction Model

- ArrowRight, ArrowDown, Space: next scene
- ArrowLeft, ArrowUp: previous scene
- Scroll or trackpad: fallback navigation
- Optional click/tap: next scene
- No presenter notes
- No PDF export

## Scene Data Shape

```js
{
  id: "agency-opening",
  eyebrow: "Research Agenda",
  title: "Human agency under algorithmic mediation",
  text: "What happens when AI systems become part of ordinary judgment, trust, and dependence?",
  background: {
    type: "black" // black | image | video
    src: "/video/example.mp4",
    fit: "cover",
    position: "center center",
    tone: "dark"
  },
  align: "left-bottom", // center | left-bottom | left-center | right-bottom
  transition: "fade" // fade | cut | slow-fade
}
```

## Component Structure

- `Talk.svelte`: owns scene state and keyboard/scroll navigation
- `TalkScene.svelte`: renders one full-screen scene
- `TalkMedia.svelte`: renders black/image/video backgrounds
- `ProgressDots.svelte`: optional minimal navigation indicator
- `data/scenes.js`: scene content

## Layout Rules

- Each scene is 100vh.
- Background defaults to black.
- Videos are muted, looped, and autoplayed only when active.
- Text is limited to one short headline and one optional supporting line.
- No dense paragraphs.
- All text must remain readable on 16:9 projection screens.

## Mobile

Mobile is supported but secondary.

- Scenes remain full-screen.
- Text scales down.
- Background media remains cover-fit.
- Arrow-key behavior is irrelevant on mobile, scroll/tap is enough.

## Acceptance Criteria

- Runs locally with `npm run dev`.
- Builds with `npm run build`.
- Can be deployed as a static GitHub Pages site.
- Keyboard navigation feels reliable in a live talk setting.
- No scene requires the audience to read long text.

