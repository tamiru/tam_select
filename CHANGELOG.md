# Changelog

## Unreleased

- Add multiline wrapping for long option labels and details, plus native title
  tooltips; wrapped lists avoid fixed-height virtualization so rows stay aligned.
- Add viewport-clamped automatic dropdown widths, measured with the rendered
  option font, so the opened menu fits its widest option without widening its
  closed control or shifting page layout.
- Polish multi-select bulk actions with icons, live match counts, native disabled
  states, a discoverable keyboard shortcut, and compact selection-count badges.
- Preserve the active scroll position when virtualized options are replaced so
  large menus no longer jump back to their first items while scrolling.
- Keep internal option-list scrolling from resizing portaled menus, and measure
  their natural content height so viewport-constrained menus can grow again.
- Add opt-in multi-select bulk actions, localized live selection counts, and
  hidden selected results, with matching JavaScript and Stimulus action APIs.
- Keep bulk changes scoped to loaded search matches, respecting disabled groups,
  selection limits, and cancelable per-item events; emit one change per batch.
- Support composition input without premature search, tag creation, or Enter
  selection, and keep search accessible after reaching the selection limit.
- Improve phone and tablet behavior with touch-optimized controls, 16px mobile
  search text, virtual-keyboard-aware menu sizing, viewport edge clamping, and
  live Visual Viewport repositioning for portaled dropdowns.
- Honor the operating system's reduced-motion preference and add mobile search
  input hints without changing native select form behavior.
- Present dropdown options with larger, menu-oriented text while keeping the
  selected single value compact and aligned with standard input sizing.
- Keep rich option images and details in the dropdown instead of allowing them
  to increase the height of the closed single-select control.
- Prevent portaled dropdowns from flashing at an oversized width or height by
  positioning them before first paint and animating only opacity and transform.
- Keep the clear button and chevron grouped at the control's trailing edge
  instead of letting competing auto margins push the clear icon inward.
- Render the clear action as a compact icon-only control and place it after the
  chevron so the X occupies the trailing edge without reserving 44px of width.
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
