# Changelog

## Unreleased

- Make the default resolved width fill its parent reliably in flex and grid layouts.
- Keep pointer hover and keyboard active states visually consistent without scrolling the menu on pointer movement.
- Tighten control and dropdown corners from 12px to 8px.
- Refresh the default theme with compact, proportional styling: thinner borders,
  tighter padding, faster transitions, and a cohesive dropdown that matches the
  control border and radius exactly.
- Replace heavy box-shadow focus rings with outline-based halos that render
  correctly over `overflow-hidden` controls.
- Switch hover highlight from a solid blue fill to a subtle `bg-zinc-100` tint,
  with keyboard-active and selected states using soft blue backgrounds instead.
- Remove the DaisyUI theme preset and its auto-detection logic; the `default`
  theme is now the only style that resolves from `"auto"`.
- Add a remote/API search demo section to the playground (GitHub API,
  custom transport, paginated infinite scroll) with a live event log.
- Add a virtual scroll demo section to the playground with 1 500 and 5 000
  item datasets, performance metrics, and DOM node counts.
- Add an RTL layout demo section to the playground with Arabic, Hebrew,
  and mixed-direction selects.

## 1.3.0 - 2026-08-24

- Add secure custom result and selection templates.
- Add localized messages and accessible action labels.
- Add cancelable lifecycle events and matching completion events.
- Synchronize native option mutations and form resets automatically.
- Add custom remote transports, parameters, response processing, and caching.
- Add dropdown portals with viewport-aware placement for modals and clipped containers.
- Expand the Stimulus action API and npm package exports.
- Move single-select search into a dedicated dropdown row while keeping the
  closed control consistent with Tailwind and Simple Form fields.
- Limit the DaisyUI preset to semantic color utilities and remove its component
  class coupling.

## 1.2.6

- Add advanced search, option groups, virtual scrolling, RTL, tag drag-and-drop,
  animation presets, TypeScript types, Rails generators, and visual polish.
