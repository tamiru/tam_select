# Changelog

## Unreleased

- Add `config.tam_select.default_select`, which renders every select as a Tam
  Select: Simple Form's `:select` type and Rails' `select_tag`, `select`,
  `collection_select` and `grouped_collection_select` (so `f.select` too),
  each with a blank option unless given. Opt a field out with
  `data: { tam_select: false }`. `tam_select:install` generates
  `config/initializers/tam_select.rb` with it enabled.
- Add a blank option to single selects by default in `tam_select_tag` and the
  Simple Form input (also when `selected:` or `default:` is given), so they
  can be cleared and show their placeholder. Pass `include_blank: false` or
  a `prompt` to control it.
- Add a `tamSelectOptions` getter to the Stimulus controller, so an app can
  subclass it (`import TamSelectController from "tam-select/stimulus"`) and
  add its own defaults, theme or computed options while the rest of the
  controller keeps updating with the package.
- The helper and Simple Form input no longer send `searchable: true` unless
  it is given, leaving the decision to the JavaScript default or the app's
  controller.
- Serve the Rails integration from the gem, so `bundle update tam_select` is
  the whole update. With importmap, the engine pins the library and the
  Stimulus controller, autoloads the helper, the Simple Form input (when Simple
  Form is present) and the controller concerns, and ships a Tailwind entry
  point for tailwindcss-rails 4.4+. An app file with the same path overrides
  the gem's. jsbundling apps now depend on the `tam-select` npm package.
- Add `bin/rails generate tam_select:update` to upgrade apps installed by
  1.3 or earlier: it removes copies that were never changed and reports the
  ones that were. `tam_select:install` is safe to re-run.
- Hide the clear button, search icon, and menu with an inline style as well
  as the `hidden` class. In Tailwind v4 the clear button's `inline-flex`
  outranked `hidden`, so it showed even with nothing to clear.
- Size the open menu like a native select: it is at least as wide as the
  control and grows to fit its widest option, up to the new
  `maxDropdownWidth` (default `480`), shifting to stay inside the viewport.
  This is now the default (`dropdownWidth: "auto"`) for inline and portaled
  menus, and RTL menus grow from the control's right edge. Use
  `dropdownWidth: "trigger"` to keep the previous behaviour.
- Add `width: "auto"` (alias `"fit"`), which sizes the closed control to its
  widest option so choosing a shorter one never resizes it. `width: "resolve"`
  now honours an inline width on the native select.
- Keep auto-width menus inside overflow-clipping ancestors (cards, modals,
  scrolling tables), keep their width steady while filtering, and cache text
  measurements so large lists stay fast.
- Stop re-requesting a failed remote page in a loop: loaded options stay
  listed with the error, and Load more retries.
- `selectValue` accepts a copied or stale item object, `createItem` is typed
  as possibly `null`, a `dir="auto"` ancestor no longer hides an RTL page,
  and snapshot recovery also removes a stale portaled dropdown.
- The Stimulus controller rebuilds selects left on the page after a cached
  frame navigation (`data-turbo-action="advance"`).
- Treat the native select as the source of truth for the selection, and act on
  the exact option used so duplicate values select and deselect correctly.
- Emit no change when re-picking the current value; keep already selected
  options when `selectOnClose` runs, and select only once in single mode.
- Clear a single select to its empty option, and hide Clear when it has none.
- Reopen a single select on its selection, keep growing type-ahead matches,
  toggle Ctrl+A off at the selection limit, and honour sorters in optgroups.
- Render the active row in virtual lists on navigation and open, and keep
  focus and `aria-activedescendant` on the trigger when search is hidden.
- Prefer `noResultsState` over `emptyState` for searches with no matches, and
  inherit direction from the nearest `dir` ancestor.
- Fix tag drag highlighting, special-character values, and cross-group drops.
- Make Load more a button, load the next page when the first cannot scroll,
  and keep loaded pages after picking a remote option with no query.
- Close and lock an open select when it is disabled; make `destroy()`
  idempotent and safe for newer instances; recover markup from page snapshots
  and tear down before `turbo:before-cache` in the Stimulus controller.
- Keep the selected option in single-select lists, marked with its check, and
  open on it like a native select; `hideSelected` now hides it in either mode.
- Keep selected-option styling when the active option moves, and style the
  active option distinctly from the selected one.
- Polish default styles: matching dropdown radius, inset option list, valid
  `origin-top` animation origin, a coloured check, and higher-contrast details,
  group headers, messages, and dark-mode spinner.
- Omit blank `detail`, `meta`, and `image` values from `tam_select_payload` so
  remote options never render empty details or broken images.
- Merge string-keyed `tam_options`/`options` without duplicate JSON keys, and
  add `selectAll`/`deselectAll` actions to the generated Stimulus controller.
- Fix Space being blocked in the single-select search input; Space now opens
  the dropdown only from the focused trigger.
- Run type-ahead only from the trigger, so keys typed into the search input
  filter results without also moving the active option ahead of the filter.
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
