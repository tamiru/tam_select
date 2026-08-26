# tam-select

[![npm version](https://img.shields.io/npm/v/tam-select.svg)](https://www.npmjs.com/package/tam-select)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/tamiru/tam_select/actions/workflows/ci.yml/badge.svg)](https://github.com/tamiru/tam_select/actions)

Accessible, searchable select component. Keeps the native `<select>` as the source of truth — form submission, validation, and autofill continue to work. Zero dependencies.

**[Live Playground](examples/playground.html)** · **[Rails Guide](#rails-integration)** · **[API Reference](#options)**

---

## Install

```bash
npm install tam-select
# or
bun add tam-select
```

## Quick Start

```html
<select id="my-select">
  <option value="">Choose a fruit…</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</select>

<script type="module">
  import TamSelect from "tam-select"

  new TamSelect(document.getElementById("my-select"), {
    searchable: true,
    clearable: true,
    placeholder: "Choose a fruit…"
  })
</script>
```

## Features

- Single and multi-select with inline tags
- Ranked fuzzy search with highlighted matches
- Remote API search with debouncing and pagination
- Option groups with section headers
- Smooth dropdown animations (11 built-in presets)
- Virtual scrolling for 1000+ items
- RTL support (Arabic, Hebrew, mixed direction)
- Custom transports for GraphQL and authenticated APIs
- Keyboard navigation: arrows, Enter, Escape, Tab, Home, End, Ctrl+A
- Combobox ARIA semantics
- Light and dark themes
- Customizable via Tailwind classes
- No jQuery, Tom Select, Select2, or Floating UI dependency

## Theming

Tam Select ships with two built-in themes:

| Theme | Style |
|---|---|
| `"default"` | Zinc palette, blue focus, subtle hover |
| `"select2"` | Gray palette, blue hover fill, bordered tags |

```js
new TamSelect(select, { theme: "select2" })
```

### Custom themes

Override any class group via the `classes` option:

```js
new TamSelect(select, {
  classes: {
    control: "h-10 rounded-lg border-2 border-indigo-500 bg-white",
    option: "px-4 py-3 hover:bg-indigo-50"
  }
})
```

### Dark mode

Tam Select follows the `dark` class on the document:

```js
document.documentElement.classList.toggle("dark")
```

## Remote Search

```js
new TamSelect(select, {
  remoteUrl: "/api/users",
  queryParam: "q",
  minQueryLength: 2,
  debounce: 300,
  processResults: (data) => ({
    items: data.users.map(u => ({
      value: u.id,
      label: u.name,
      detail: u.email,
      meta: u.role
    })),
    pagination: { has_more: data.total > data.page * 20 }
  })
})
```

### Custom transport

```js
new TamSelect(select, {
  transport: async ({ url, query, signal }) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal
    })
    return res.json()
  },
  processResults: (data) => ({
    items: data.nodes.map(n => ({ value: n.id, label: n.name })),
    pagination: { has_more: data.pageInfo.hasNextPage }
  })
})
```

## Virtual Scroll

For large datasets, enable virtual scrolling to render only visible options:

```js
new TamSelect(select, {
  virtualScroll: true,
  virtualItemHeight: 44
})
```

Auto-enables when visible items exceed `virtualScrollThreshold` (default: 100).

## Animations

Choose a preset:

```js
new TamSelect(select, { animationPreset: "spring" })
```

| Preset | Duration | Feel |
|---|---|---|
| `"default"` | 150ms | Standard |
| `"material"` | 250ms | Material Design |
| `"spring"` | 400ms | Bouncy overshoot |
| `"bounce"` | 500ms | Overshoot bounce |
| `"elastic"` | 600ms | Wide spring |
| `"snappy"` | 100ms | Fast, responsive |
| `"smooth"` | 300ms | Gentle ease |
| `"fade"` | 200ms | Simple opacity |
| `"pop"` | 200ms | Quick pop-in |
| `"slide"` | 250ms | Smooth deceleration |
| `"none"` | 0ms | Instant |

## Options

| Option | Default | Description |
|---|---:|---|
| `searchable` | `true` | Enable text filtering |
| `creatable` | `false` | Allow typed values to become options |
| `clearable` | `true` | Show clear button |
| `closeAfterSelect` | `true` (single) | Close dropdown after selection |
| `placeholder` | `"Select…"` | Placeholder text |
| `remoteUrl` | `null` | Remote search endpoint |
| `minQueryLength` | `0` | Characters before remote search |
| `debounce` | `250` | Remote request delay (ms) |
| `maximumSelectionLength` | `0` | Max selectable items (0 = unlimited) |
| `theme` | `"auto"` | `"default"`, `"select2"`, or `"auto"` |
| `classes` | `{}` | Override any Tailwind class group |
| `animationPreset` | `null` | Built-in animation preset |
| `virtualScroll` | `false` | Enable virtual scrolling |
| `virtualItemHeight` | `44` | Row height for virtual scroll |
| `fuzzySearch` | `true` | Tolerate typing mistakes |
| `highlightMatches` | `true` | Highlight search matches |
| `sortByRelevance` | `true` | Rank strong matches first |

## API

```js
const instance = new TamSelect(select, options)

instance.open()              // Open dropdown
instance.close()             // Close dropdown
instance.focus()             // Focus search input
instance.blur()              // Remove focus
instance.setValue("apple")   // Set selected value
instance.clear()             // Clear all selections
instance.refresh()           // Re-read native options
instance.addData({ value: "new", label: "New" })  // Add option
instance.removeData("old")   // Remove option
instance.clearRemoteCache()  // Clear cached responses
instance.destroy()           // Remove all generated markup

// Read current value
instance.value  // "apple" or ["apple", "banana"]

// Get existing instance
TamSelect.getInstance(select)
```

## Events

All events bubble on the original `<select>`:

```js
select.addEventListener("tam-select:change", (e) => console.log(e.detail.value))
select.addEventListener("tam-select:open", () => console.log("opened"))
select.addEventListener("tam-select:close", () => console.log("closed"))
select.addEventListener("tam-select:select", (e) => console.log(e.detail.item))
select.addEventListener("tam-select:create", (e) => console.log(e.detail.item))
select.addEventListener("tam-select:error", (e) => console.error(e.detail.error))
```

Cancelable: `opening`, `closing`, `selecting`, `unselecting`, `clearing`, `creating`.

---

## Rails Integration

### Installation

```ruby
# Gemfile
gem "tam_select", github: "tamiru/tam_select"
```

```bash
bundle install
bin/rails generate tam_select:install
```

### Usage

```erb
<%= form.select :region_id,
      options_from_collection_for_select(Region.order(:name), :id, :name),
      { prompt: "Select region" },
      data: {
        controller: "tam-select",
        tam_select_options_value: { placeholder: "Search…" }.to_json
      } %>
```

### Simple Form

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: Region.order(:name),
      label_method: :name,
      value_method: :id,
      prompt: "Select region" %>
```

### Remote search

```ruby
class RegionsController < ApplicationController
  include TamSelectRemote

  tam_select_remote(
    model: Region,
    label: :name,
    detail: :description,
    search_by: %i[name code],
    scope: -> { Region.order(:name) }
  )
end
```

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: [form.object.region].compact,
      input_html: {
        tam_options: {
          remoteUrl: tam_select_options_regions_path(format: :json),
          minQueryLength: 1
        }
      } %>
```

---

## CI/CD

### GitHub Actions

The CI workflow validates Ruby, JavaScript, TypeScript declarations, and npm package contents on every push.

### Publishing

A matching `v*.*.*` tag publishes both the gem and npm package.

**Required secrets** in the `release` environment:

| Secret | Description |
|---|---|
| `RUBYGEMS_API_KEY` | Push-only key scoped to `tam_select` |
| `NPM_TOKEN` | Automation token with publish access to `tam-select` |

```bash
# Release
git tag v1.3.1
git push origin v1.3.1
```

### Local development

```bash
bundle install
bundle exec rake test    # Ruby tests
npm test                  # JavaScript tests
npm run check             # Syntax check
npm run typecheck         # TypeScript declarations
```

## License

[MIT](LICENSE)
