the # Tam Select

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Gem Version](https://img.shields.io/badge/version-0.1.1-blue.svg)](https://github.com/tamiru/tam_select)

**Tam Select** is an accessible, searchable select component for Ruby on Rails, built for Simple Form, Stimulus, Turbo, and Tailwind CSS. It keeps the native `<select>` as the source of truth, so Rails form submission, validation, selected values, and browser autofill continue to work.

## Requirements

- Ruby 3.2 or newer
- Rails 8
- Stimulus 3.2 or newer
- Tailwind CSS 4
- Simple Form when using the `TamSelectInput` integration

## Rails installation

Add the gem directly from GitHub:

```ruby
# Gemfile
gem "tam_select", github: "tamiru/tam_select"
```

Install the dependency and generate the Rails integration files:

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
app/controllers/tam_select_remote_controller.rb
app/helpers/tam_select_helper.rb
```

Commit these generated files with the Rails application. This makes customization straightforward and allows Tailwind CSS 4 to scan the component without resolving a Ruby gem directory at build time.

Add the generated JavaScript to Tailwind's source detection in `app/assets/tailwind/application.css`:

```css
@import "tailwindcss";
@source "../../javascript/tam_select/**/*.js";
```

### Updating

The Rails integration files are copied into your application, so updating the gem does not update them automatically. Commit local customizations first, then run:

```bash
bundle update tam_select
bin/rails generate tam_select:install
```

Rails prompts before replacing changed files. To replace every generated file without prompting, use:

```bash
bin/rails generate tam_select:install --force
```

Review `git diff` afterward because `--force` overwrites application-specific customizations.

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

## JavaScript installation

For a non-Rails application, install directly from GitHub:

```bash
npm install github:tamiru/tam_select
```

## Tailwind CSS 4

Add the package source to `app/assets/tailwind/application.css` so Tailwind generates every class used by the JavaScript templates:

```css
@import "tailwindcss";
@source "../../../node_modules/tam-select/src/**/*.js";
@source "../../../node_modules/tam-select/rails/**/*.js";
```

When the Rails generator is used, scan the generated component source:

```css
@source "../../javascript/tam_select/**/*.js";
```

## Rails and Stimulus

The install generator copies the Stimulus controller into your application, where Stimulus normally discovers it automatically. If controllers are registered manually:

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

The install generator creates `app/inputs/tam_select_input.rb`. Use it like any other Simple Form input:

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: Region.order(:name),
      label_method: :name,
      value_method: :id,
      prompt: "Select region",
      input_html: {
        tam_options: {
          remoteUrl: region_options_path(format: :json),
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

The generator installs `TamSelectPaginatable` as a Rails response helper. A complete Region controller is available in [`examples/regions_controller.rb`](examples/regions_controller.rb).

Secure remote endpoints exactly like other Rails JSON endpoints. Scope records by the current user's permissions and never trust a submitted value merely because it appeared in the dropdown.

### Generic remote controller

The installer generates `TamSelectRemoteController`. Create a small subclass for each allowed remote source:

```ruby
# app/controllers/region_options_controller.rb
class RegionOptionsController < TamSelectRemoteController
  tam_select model: Region, label: :name, search_by: %i[name code]

  private

  # Override this method when records require authorization or tenant scoping.
  def tam_select_scope(config)
    current_account.regions.order(:name)
  end
end
```

Expose the JSON endpoint and pass it to the input:

```ruby
# config/routes.rb
get "region_options", to: "region_options#index", defaults: { format: :json }
```

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: [form.object.region].compact,
      label_method: :name,
      value_method: :id,
      input_html: {
        tam_options: {
          remoteUrl: region_options_path(format: :json),
          minQueryLength: 1
        }
      } %>
```

Do not accept a model name from request parameters. Declaring each source in a controller subclass prevents clients from querying arbitrary application models.

The browser sends requests such as:

```text
GET /region_options.json?q=addis&page=1
Accept: application/json
```

Test an endpoint independently with:

```bash
curl -H "Accept: application/json" \
  "http://localhost:3000/region_options.json?q=addis&page=1"
```

A `406 Not Acceptable` response means the route or controller rejected JSON. Keep `defaults: { format: :json }` on the route, use a `.json` URL, and ensure the controller does not restrict responses to HTML only.

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
bundle install
bundle exec rake test
npm test
npm run check
```

## License

Tam Select is available under the [MIT License](LICENSE).
