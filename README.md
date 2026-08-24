# Tam Select

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Gem Version](https://img.shields.io/badge/version-1.2.6-blue.svg)](https://github.com/tamiru/tam_select)

**Tam Select** is an accessible, searchable select component for Ruby on Rails, built for Simple Form, Stimulus, Turbo, and Tailwind CSS. It keeps the native `<select>` as the source of truth, so Rails form submission, validation, selected values, and browser autofill continue to work. It is a complete, modern, jQuery-free replacement for Select2.

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

The generator installs the core module, Stimulus controller, Rails helpers, and remote-search concerns:

```text
app/javascript/tam_select/tam_select.js
app/javascript/controllers/tam_select_controller.js
app/controllers/concerns/tam_select_paginatable.rb
app/controllers/concerns/tam_select_remote.rb
app/controllers/tam_select_remote_controller.rb
app/helpers/tam_select_helper.rb
```

When Simple Form is present, it also installs `app/inputs/tam_select_input.rb`. Simple Form is optional; applications without it receive a short skip message and continue with standard Rails form helpers.

Commit these generated files with the Rails application. This makes customization straightforward and allows Tailwind CSS 4 to scan the component without resolving a Ruby gem directory at build time.

### Rails 8 importmap

The default Rails 8 importmap setup needs no manual JavaScript package installation. The generator adds this pin to `config/importmap.rb`:

```ruby
pin "tam_select", to: "tam_select/tam_select.js"
```

The generated Stimulus controller imports `TamSelect` from `"tam_select"`. Running the generator again updates an old pin when necessary and never adds a duplicate. Rails' normal `pin_all_from "app/javascript/controllers", under: "controllers"` line discovers the generated controller.

### jsbundling-rails and esbuild

The same generated controller works with esbuild when the bare `tam_select` import is aliased to the generated core file. When Importmap is absent, the installer detects an existing esbuild `build` script in `package.json` and appends the alias automatically:

```json
{
  "scripts": {
    "build": "esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets --alias:tam_select=./app/javascript/tam_select/tam_select.js"
  }
}
```

The update is idempotent, so rerunning the installer does not duplicate the alias. If `package.json` or an esbuild build script is not present, the installer prints the exact alias flag to add manually.

This uses the local file installed by the generator. For non-Rails bundler use, install the npm package from GitHub and import its published package name instead:

```bash
npm install github:tamiru/tam_select
```

```js
import TamSelect from "tam-select"
```

Add the generated JavaScript to Tailwind's source detection in `app/assets/tailwind/application.css`:

```css
@import "tailwindcss";
@source "../../javascript/tam_select/**/*.js";
```

### Upgrading

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

Versions before this release generated a relative controller import. After upgrading, confirm the controller uses `import TamSelect from "tam_select"` and that the importmap pin or esbuild alias above is present.

## Features

- Single and multiple selection
- Ranked, typo-tolerant local search with highlighted matches and user-created tags
- Remote JSON search with debouncing and incremental pagination
- Option groups (`<optgroup>`) with visual section headers
- Smooth dropdown open/close animations
- Type-ahead search: rapid character typing jumps to matching options
- Lazy-loaded option images via IntersectionObserver
- Custom empty, no-results, and loading state templates
- Maximum selection length limit (`maximumSelectionLength`)
- Maximum input length limit (`maximumInputLength`)
- Minimum results before showing search box (`minimumResultsForSearch`)
- Auto-select active option on close (`selectOnClose`)
- Automatic tokenization into tags (`tokenSeparators`)
- Custom result sorting (`sorter`)
- Programmatic data management (`addData` / `removeData`)
- Focus and blur API (`focus()` / `blur()`)
- Keyboard navigation: arrows, Enter, Escape, Tab, Backspace, Home, End, Ctrl+A
- Combobox/listbox ARIA semantics
- Configurable dropdown width
- Loading, empty, and error states
- Select2-style closed selection and open search states with clear active, selected, disabled, loading, empty, and error feedback
- Right-aligned select chevron that remains pinned to the control edge for short and default labels
- Light and dark Tailwind themes
- DaisyUI semantic theme with auto-detection
- Rails 8, Turbo, Turbo Frames, Stimulus, and Simple Form integration
- Public API and bubbling custom events
- No jQuery, Tom Select, Select2, Preline, or Floating UI dependency

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

Tam Select includes adaptive light and dark styles for every state. It follows a `dark` class on the document or any ancestor and also sets the appropriate native `color-scheme`:

```js
document.documentElement.classList.toggle("dark")
```

### DaisyUI styling

If the application uses [DaisyUI](https://daisyui.com/), enable its semantic
color and component classes with the `daisyui` theme preset:

```erb
<%= form.select :region_id,
      options_from_collection_for_select(Region.order(:name), :id, :name),
      { prompt: "Select region" },
      data: {
        controller: "tam-select",
        tam_select_options_value: { theme: "daisyui" }.to_json
      } %>
```

The preset keeps the native select hidden as the source of truth and styles the
search control, dropdown, badges, focus state, validation state, and selected
options to match DaisyUI. It can be combined with `classes` for local changes.

The closed single-select control uses DaisyUI's `input` component class, so its
height, inline padding, border, radius, typography, focus outline, disabled
state, and `input-error` validation state match a standard `input w-full` field.
Multiple selects keep the same minimum height and grow only when tags wrap.
All colors use DaisyUI semantic tokens, so changing `data-theme` updates the
component without rebuilding or reconnecting it.

Generated Rails helpers use `theme: "auto"`. A native select carrying DaisyUI's
`input` or `select` class automatically receives this preset; other selects keep
the default Tam Select appearance. An explicit `theme` option always wins.

For Tailwind CSS 4 class-based theming, define the variant in the application stylesheet if it is not already present:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

## Standard Rails forms and Stimulus

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

For multiple selection, Rails must receive an array field and the native select must include `multiple: true`:

```erb
<%= form.select :skill_ids,
      options_from_collection_for_select(Skill.order(:name), :id, :name, form.object.skill_ids),
      {},
      multiple: true,
      data: {
        controller: "tam-select",
        tam_select_options_value: {
          searchable: true,
          closeAfterSelect: false,
          placeholder: "Add skills…"
        }.to_json
      } %>
```

The original `<select>` remains the source of truth. This preserves form names in nested forms, submitted values, prompts, `required`, validation metadata, and native `change` events.

## Simple Form

When the `simple_form` gem is installed, the generator creates `app/inputs/tam_select_input.rb`. Use `as: :tam_select` with any Simple Form collection input. The input forwards Simple Form's prompt, selected values, multiple flag, error classes, ARIA attributes, and nested builder context to the native collection select.

### Local collection

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: Region.order(:name),
      label_method: :name,
      value_method: :id,
      prompt: "Select region" %>
```

### Remote collection

Keep the currently selected record in the initial collection so edit forms can display its label before the AJAX request completes:

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: [form.object.region].compact,
      label_method: :name,
      value_method: :id,
      prompt: "Select region",
      input_html: {
        tam_options: {
          remoteUrl: tam_select_options_regions_path(format: :json),
          minQueryLength: 1,
          debounce: 250
        }
      } %>
```

The concern and route required by this example are described in [Add remote search to an existing controller](#add-remote-search-to-an-existing-controller).

### Multiple selection

```erb
<%= form.input :skill_ids,
      as: :tam_select,
      collection: Skill.order(:name),
      label_method: :name,
      value_method: :id,
      input_html: {
        multiple: true,
        tam_options: {
          searchable: true,
          closeAfterSelect: false
        }
      } %>
```

Options are passed under `input_html[:tam_options]`. Common options include `searchable`, `creatable`, `clearable`, `placeholder`, `searchPlaceholder`, `remoteUrl`, `minQueryLength`, and `debounce`. See [Main options](#main-options) for defaults.

## Advanced local search

Local searches rank exact, prefix, word, and substring matches before fuzzy
matches. Search remains accent-insensitive, works across `label`, `detail`, and
`meta`, highlights matching text, and announces the number of results to screen
readers. For example, `oromai` can still find `Oromia`, while an exact `Oromia`
label ranks above an option that only mentions Oromia in its detail.

The behavior is configurable without replacing the matcher:

```erb
input_html: {
  tam_options: {
    fuzzySearch: true,
    highlightMatches: true,
    sortByRelevance: true,
    searchFields: %w[label detail meta]
  }
}
```

Set `fuzzySearch`, `highlightMatches`, or `sortByRelevance` to `false` when a
screen needs strict matching or native option order. A custom `matcher` still
takes precedence over built-in filtering.

## Remote API contract

`tam-select` sends `q` and `page` query parameters and expects:

```json
{
  "items": [
    { "value": "1", "label": "Hana Bekele", "detail": "Admission no. UG/1024/26", "meta": "Active", "image": "/avatars/hana.jpg" },
    { "value": "2", "label": "Afar", "detail": "Semera", "meta": "AF" }
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

### Add remote search to an existing controller

Include `TamSelectRemote` and declare the allowed model and searchable fields. This adds the public `tam_select_options` action to the controller:

```ruby
# app/controllers/regions_controller.rb
class RegionsController < ApplicationController
  include TamSelectRemote

  tam_select_remote(
    model: Region,
    label: :name,
    value: :id,
    detail: :description,
    meta: :code,
    search_by: %i[name code],
    scope: -> { Region.order(:name) },
    per_page: 20
  )
end
```

The optional `scope` lambda runs in the controller context, so it can use `current_user`, `current_account`, or an authorization policy.

```ruby
# config/routes.rb
resources :regions do
  get :tam_select_options, on: :collection, defaults: { format: :json }
end
```

Point Simple Form to that collection action:

```erb
<%= form.input :region_id,
      as: :tam_select,
      collection: [form.object.region].compact,
      label_method: :name,
      value_method: :id,
      input_html: {
        tam_options: {
          remoteUrl: tam_select_options_regions_path(format: :json),
          minQueryLength: 1
        }
      } %>
```

Typing sends `GET /regions/tam_select_options.json?q=addis&page=1` and receives the standard Tam Select JSON payload.

When `pagination.has_more` is true, scrolling near the bottom requests `next_page`. Earlier pages keep their order, duplicate values are collapsed, and a later response can update an existing item's label, metadata, image, or disabled state. A new query aborts the old request and never displays cached results from the previous query.

Remote items may include optional `detail`, `meta`, and `image` fields. Tam Select renders the primary label with the detail on a second line and an optional circular image on the left. The selected value keeps the same image, label, and detail, including an initial value rendered before remote search completes. `meta` remains a badge on the right.

This works well for program and student searches. For example, return the program name as `label` and admission as `detail`:

```ruby
tam_select_remote(
  model: Estudent::Program,
  label: :name,
  detail: ->(program) { program.admission.to_s },
  search_by: %i[name],
  scope: -> { Estudent::Program.includes(admission: %i[admission_type enrollment_type enrollment_mode]).order(:name) }
)
```

For student search, add the admission number and photo URL:

```ruby
tam_select_remote(
  model: Estudent::Student,
  label: ->(student) { student.full_name },
  detail: ->(student) { "Admission no. #{student.applicant.registration_number}" },
  image: ->(student) { url_for(student.applicant.person.avatar) if student.applicant.person.avatar.attached? },
  search_by: %i[id_number],
  scope: -> { Estudent::Student.includes(applicant: { person: { avatar_attachment: :blob } }) }
)
```

For a local native select, provide the same values as option data attributes:

```erb
<option value="1" data-detail="Admission no. UG/1024/26" data-meta="Active" data-image="/avatars/hana.jpg">Hana Bekele</option>
```

The browser sends requests such as:

```text
GET /regions/tam_select_options.json?q=addis&page=1
Accept: application/json
```

Test an endpoint independently with:

```bash
curl -H "Accept: application/json" \
  "http://localhost:3000/regions/tam_select_options.json?q=addis&page=1"
```

A `406 Not Acceptable` response means the route or controller rejected JSON. Keep `defaults: { format: :json }` on the route, use a `.json` URL, and ensure the controller does not restrict responses to HTML only.

## Creatable values

Set `creatable: true` for tag-style input. The Create action is part of the same keyboard list as normal results, so ArrowUp and ArrowDown can highlight it and Enter creates it.

```erb
<%= form.select :category_ids,
      options_from_collection_for_select(Category.order(:name), :id, :name),
      {},
      multiple: true,
      data: {
        controller: "tam-select",
        tam_select_options_value: {
          creatable: true,
          closeAfterSelect: false,
          placeholder: "Add categories…"
        }.to_json
      } %>
```

Values and labels are compared with normalized, case-insensitive, accent-insensitive text before creation, preventing duplicate entries such as `Café` and `cafe`. A successful creation dispatches `tam-select:create`.

## Keyboard and accessibility behavior

- ArrowDown and ArrowUp open the list, move through the rendered entries, and skip disabled options and group headers.
- Home and End jump to the first and last selectable option.
- Enter selects the highlighted option or activates the highlighted Create action.
- Escape closes the list and returns focus to the combobox; Tab closes without trapping focus.
- Backspace removes the last tag from a multiple select when the search input is empty.
- Ctrl+A toggles all visible options in multi-select mode.
- Type-ahead: rapid character typing (within 500ms) jumps to the first matching option.
- Searchable controls use an input combobox; non-searchable controls use a focusable button combobox.
- Rails labels, descriptions, required state, disabled state, and invalid state are mirrored from the native select.
- `selectOnClose` automatically selects the active option when the dropdown closes.
- `maximumSelectionLength` limits the number of selectable items and disables the input at the limit.

## Core JavaScript

For a generated Rails/importmap installation, use the pinned module name:

```js
import TamSelect from "tam_select"

const instance = new TamSelect(document.querySelector("#student_region_id"), {
  searchable: true,
  creatable: false,
  remoteUrl: "/regions",
  minQueryLength: 1
})

instance.setValue("2")
instance.open()
instance.close()
instance.clear()
instance.refresh()
instance.focus()
instance.blur()
instance.addData({ value: "new", label: "New Option" })
instance.removeData("old-value")
instance.destroy()
```

When consuming the npm package directly, import from `"tam-select"` instead.

### Option groups

Native `<optgroup>` elements are automatically detected and rendered as section headers in the dropdown:

```erb
<%= form.select :region_id,
      grouped_options_for_select(
        [["Africa", [["Ethiopia", "et"], ["Kenya", "ke"]]],
         ["Asia", [["Japan", "jp"], ["China", "cn"]]]
      ]),
      { prompt: "Select region" },
      data: { controller: "tam-select" } %>
```

### Animations

The dropdown opens and closes with a smooth CSS transition. Disable it with `animations: false`:

```js
new TamSelect(select, { animations: false })
```

### Lazy-load images

Option images are loaded only when they scroll into the dropdown viewport:

```js
new TamSelect(select, { lazyLoadImages: true })
```

### Custom empty and loading states

Provide a string or a function `(element) => {}` to render custom content:

```js
new TamSelect(select, {
  emptyState: "No options yet. Create one!",
  noResultsState: (el) => { el.innerHTML = '<em>Nothing found</em>' },
  loadingState: "Fetching options..."
})
```

### Maximum selection length

Limit the number of items that can be selected in multi-select mode:

```js
new TamSelect(select, { maximumSelectionLength: 5 })
```

The input is disabled when the limit is reached. Setting `maximumSelectionLength: 0` (default) removes the limit.

### Maximum input length

Limit the number of characters in the search input:

```js
new TamSelect(select, { maximumInputLength: 20 })
```

### Minimum results for search

Only show the search box when there are enough options:

```js
new TamSelect(select, { minimumResultsForSearch: 10 })
```

The search input is hidden when the option count is below the threshold. `0` (default) always shows the search.

### Select on close

Automatically select the currently highlighted option when the dropdown closes (Escape, Tab, or clicking outside):

```js
new TamSelect(select, { selectOnClose: true })
```

### Token separators

In multi-select mode, automatically create tags when the user types a separator character:

```js
new TamSelect(select, {
  creatable: true,
  tokenSeparators: [",", " "]  // Comma or space creates a new tag
})
```

### Custom sorter

Provide a custom sort function for search results:

```js
new TamSelect(select, {
  sorter: (items) => items.sort((a, b) => a.label.localeCompare(b.label))
})
```

### Width

Control the container width:

```js
new TamSelect(select, { width: "300px" })  // Fixed width
new TamSelect(select, { width: "100%" })   // Full width (default: "resolve")
```

## Main options

| Option | Default | Purpose |
|---|---:|---|
| `searchable` | `true` | Enables text filtering |
| `creatable` | `false` | Allows typed values to become options |
| `clearable` | `true` | Displays the clear control |
| `closeAfterSelect` | Single only | Keeps multiple dropdowns open |
| `placeholder` | Native prompt or `Select…` | Closed-control placeholder |
| `searchPlaceholder` | `Search…` | Search-input placeholder |
| `remoteUrl` | `null` | JSON search endpoint |
| `queryParam` | `q` | Remote search parameter |
| `pageParam` | `page` | Remote page parameter |
| `debounce` | `250` | Remote request delay in milliseconds |
| `minQueryLength` | `0` | Characters required before requesting |
| `maximumSelectionLength` | `0` | Max items selectable (0 = unlimited) |
| `maximumInputLength` | `0` | Max characters in search input (0 = unlimited) |
| `minimumResultsForSearch` | `0` | Min options before showing search box |
| `selectOnClose` | `false` | Auto-select active option when dropdown closes |
| `tokenSeparators` | `[]` | Characters that trigger tag creation (e.g. `[",", " "]`) |
| `sorter` | `null` | Custom sort function `(items) => items` |
| `width` | `"resolve"` | Container width (CSS value or `"resolve"` for auto) |
| `fuzzySearch` | `true` | Tolerates small typing mistakes in local search |
| `highlightMatches` | `true` | Highlights direct query matches in results |
| `sortByRelevance` | `true` | Ranks stronger local matches first |
| `searchFields` | `label`, `detail`, `meta` | Item fields included in local search |
| `resultsText` | Result count | Function or text announced after filtering |
| `valueField` | `value` | Remote item value key |
| `labelField` | `label` | Remote item label key |
| `imageField` | `image` | Remote item image URL key |
| `matcher` | `null` | Optional `(item, query) => boolean` local matcher |
| `theme` | `"auto"` | Visual preset; `"default"`, `"daisyui"`, or `"auto"` for class detection |
| `classes` | `{}` | Overrides any Tailwind class group |
| `animations` | `true` | Smooth dropdown open/close transitions |
| `lazyLoadImages` | `false` | Load option images only when visible |
| `emptyState` | `null` | Custom content for empty option list |
| `noResultsState` | `null` | Custom content when no results match |
| `loadingState` | `null` | Custom content during loading |

## Events

Listen on the original select. Every event bubbles:

```js
select.addEventListener("tam-select:change", ({ detail }) => console.log(detail.value))
select.addEventListener("tam-select:open", () => console.log("opened"))
select.addEventListener("tam-select:close", () => console.log("closed"))
select.addEventListener("tam-select:load", ({ detail }) => console.log(detail.items))
select.addEventListener("tam-select:create", ({ detail }) => console.log(detail.item))
select.addEventListener("tam-select:error", ({ detail }) => console.error(detail.error))
select.addEventListener("tam-select:data:add", ({ detail }) => console.log(detail.items))
select.addEventListener("tam-select:data:remove", ({ detail }) => console.log(detail.items))
```

Standard native `change` events are also dispatched for Rails and other controllers.

### Public API

| Method | Description |
|---|---|
| `open()` | Opens the dropdown |
| `close()` | Closes the dropdown |
| `focus()` | Focuses the search input or trigger |
| `blur()` | Removes focus |
| `setValue(value)` | Sets the selected value(s) |
| `clear()` | Clears all selections |
| `refresh()` | Re-reads native options and re-renders |
| `addData(raw)` | Adds one or more options programmatically |
| `removeData(values)` | Removes options by value |
| `destroy()` | Removes all generated markup and restores the native select |

Read the current selection through `instance.value`, and recover an existing instance with `TamSelect.getInstance(select)`.

## Development

```bash
bundle install
bundle exec rake test
npm test
npm run check
```

## License

Tam Select is available under the [MIT License](LICENSE).
