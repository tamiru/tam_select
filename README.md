# tam_select

`tam-select` is a dependency-light, accessible select enhancement built with Tailwind CSS 4 classes. It keeps the native `<select>` as the source of truth, so Rails form submission, validation, selected values, and browser autofill continue to work.

## Install as a Rails gem

For a local checkout:

```ruby
# Gemfile
gem "tam_select", path: "vendor/tam-select"
```

For a Git repository:

```ruby
gem "tam_select", github: "winner-systems/tam_select"
```

Then install the integration files:

```bash
bundle install
bin/rails generate tam_select:install
```

The generator installs:

```text
app/javascript/tam_select/tam_select.js
app/javascript/controllers/tam_select_controller.js
app/inputs/tam_select_input.rb
app/controllers/concerns/tam_select_paginatable.rb
```

Commit these generated files with the Rails application. This makes customization straightforward and allows Tailwind CSS 4 to scan the component without resolving a Ruby gem directory at build time.

To build and publish the gem:

```bash
gem build tam_select.gemspec
gem push tam_select-0.1.0.gem
```

## Features

- Single and multiple selection
- Local search and user-created tags
- Remote JSON search with debouncing and incremental pagination
- Loading, empty, and error states
- Keyboard navigation: arrows, Enter, Escape, Tab, and Backspace
- Combobox/listbox ARIA semantics
- Light and dark Tailwind themes
- Rails 8, Turbo, Turbo Frames, Stimulus, and Simple Form integration
- Public API and bubbling custom events
- No jQuery, Tom Select, Select2, Preline, or Floating UI dependency

## Optional npm installation

The same repository remains npm-compatible for non-Rails applications. Until published to npm, install it by path:

```bash
npm install ./vendor/tam-select
```

After publication, installation becomes:

```bash
npm install tam-select
```

## Tailwind CSS 4

Add the package source to `app/assets/tailwind/application.css` so Tailwind generates every class used by the JavaScript templates:

```css
@import "tailwindcss";
@source "../../../node_modules/tam-select/src/**/*.js";
@source "../../../node_modules/tam-select/rails/**/*.js";
```

If `tam-select` lives under `vendor/tam-select`, scan that path instead:

```css
@source "../../../vendor/tam-select/src/**/*.js";
```

## Rails 8 + Stimulus

Copy `rails/app/javascript/controllers/tam_select_controller.js` into your application's controller directory. Stimulus normally discovers it automatically. If controllers are registered manually:

```js
import TamSelectController from "./tam_select_controller"
application.register("tam-select", TamSelectController)
```

Use a normal Rails select:

```erb
<%= form.select :region_id,
      options_from_collection_for_select(Region.order(:name), :id, :name, form.object.region_id),
      { prompt: "Select region" },
      data: {
        controller: "tam-select",
        tam_select_options_value: {
          searchable: true,
          placeholder: "Select region…"
        }.to_json
      } %>
```

Stimulus destroys generated markup when Turbo removes the select and recreates it on reconnection.

## Simple Form

Copy `rails/app/inputs/tam_select_input.rb` to `app/inputs/tam_select_input.rb`, then use:

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: Region.order(:name),
      label_method: :name,
      value_method: :id,
      prompt: "Select region",
      input_html: {
        tam_options: {
          remoteUrl: regions_path,
          minQueryLength: 1
        }
      } %>
```

For a many-to-many field, add `multiple: true` to `input_html`.

## Remote API contract

`tam-select` sends `q` and `page` query parameters and expects:

```json
{
  "items": [
    { "value": "1", "label": "Addis Ababa" },
    { "value": "2", "label": "Afar" }
  ],
  "pagination": {
    "page": 1,
    "next_page": 2,
    "has_more": true
  }
}
```

Copy `TamSelectPaginatable` from `rails/app/controllers/concerns` for a Rails response helper. A complete Region controller is in `examples/regions_controller.rb`.

Secure remote endpoints exactly like other Rails JSON endpoints. Scope records by the current user's permissions and never trust a submitted value merely because it appeared in the dropdown.

## Core JavaScript

```js
import TamSelect from "tam-select"

const instance = new TamSelect(document.querySelector("#student_region_id"), {
  searchable: true,
  creatable: false,
  remoteUrl: "/regions",
  minQueryLength: 1
})

instance.setValue("2")
instance.clear()
instance.refresh()
instance.destroy()
```

## Main options

| Option | Default | Purpose |
|---|---:|---|
| `searchable` | `true` | Enables text filtering |
| `creatable` | `false` | Allows typed values to become options |
| `clearable` | `true` | Displays the clear control |
| `closeAfterSelect` | Single only | Keeps multiple dropdowns open |
| `remoteUrl` | `null` | JSON search endpoint |
| `queryParam` | `q` | Remote search parameter |
| `pageParam` | `page` | Remote page parameter |
| `debounce` | `250` | Remote request delay in milliseconds |
| `minQueryLength` | `0` | Characters required before requesting |
| `valueField` | `value` | Remote item value key |
| `labelField` | `label` | Remote item label key |
| `classes` | `{}` | Overrides any Tailwind class group |

## Events

Listen on the original select. Every event bubbles:

```js
select.addEventListener("tam-select:change", ({ detail }) => console.log(detail.value))
select.addEventListener("tam-select:load", ({ detail }) => console.log(detail.items))
select.addEventListener("tam-select:create", ({ detail }) => console.log(detail.item))
select.addEventListener("tam-select:error", ({ detail }) => console.error(detail.error))
```

Standard native `change` events are also dispatched for Rails and other controllers.

## Development

```bash
npm test
npm run check
```

Version `0.1.0` is a strong application-ready foundation. Before publishing broadly, add browser-level tests with Playwright covering screen readers, mobile Safari, IME text entry, nested Turbo Frames, and very large datasets.
