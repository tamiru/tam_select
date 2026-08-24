import test from "node:test"
import assert from "node:assert/strict"
import TamSelect from "../src/tam-select.js"
import { flush, input, jsonResponse, keydown, setupDOM } from "./dom_helper.js"

const localSelect = ({ multiple = false, selected = "", extra = "" } = {}) => `
  <label for="region">Region</label>
  <p id="region-help">Choose a region</p>
  <select id="region" ${multiple ? "multiple" : ""} ${extra}>
    <option value="">Select a region</option>
    <option value="aa" ${selected === "aa" ? "selected" : ""}>Addis Ababa</option>
    <option value="or" ${selected === "or" ? "selected" : ""}>Oromia</option>
    <option value="ti" disabled>Tigray</option>
    <option value="sn" data-detail="Hawassa" data-meta="South">Sidama</option>
    <option value="cf">Café Region</option>
  </select>
`

test("single selection uses the rendered visible item for arrows and Enter", () => {
  const cleanup = setupDOM(localSelect({ selected: "aa" }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)

    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["or", "ti", "sn", "cf"])
    assert.equal(tamSelect.activeIndex, 0)

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.opened, true)
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "or")

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "sn", "disabled Tigray is skipped")
    keydown(tamSelect.input, "Enter")

    assert.equal(select.value, "sn")
    assert.equal(tamSelect.value, "sn")
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("multiple selection, Backspace removal, and clear keep the native select authoritative", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.options[1].selected = true
    select.options[2].selected = true
    const tamSelect = new TamSelect(select)

    assert.deepEqual(tamSelect.value, ["aa", "or"])
    assert.equal(tamSelect.values.querySelectorAll("button").length, 2)

    keydown(tamSelect.input, "Backspace")
    assert.deepEqual(tamSelect.value, ["aa"])

    tamSelect.clearButton.click()
    assert.deepEqual(tamSelect.value, [])
    assert.deepEqual(Array.from(select.selectedOptions), [])
  } finally {
    cleanup()
  }
})

test("local search matches multiple terms, details, metadata, and unaccented text", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))

    input(tamSelect.input, "sidama south")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["sn"])

    input(tamSelect.input, "hawassa")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["sn"])

    input(tamSelect.input, "cafe")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["cf"])
  } finally {
    cleanup()
  }
})

test("advanced local search ranks strong matches and tolerates typing mistakes", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select a region</option>
      <option value="western">Western Oromia</option>
      <option value="oromia">Oromia Regional State</option>
      <option value="sidama">Sidama</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))

    input(tamSelect.input, "oromia")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["oromia", "western"])

    input(tamSelect.input, "oromai")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["western", "oromia"])
  } finally {
    cleanup()
  }
})

test("search highlights normalized matches and announces the result count", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))

    input(tamSelect.input, "cafe")
    const match = tamSelect.dropdown.querySelector('[data-value="cf"]')
    assert.equal(match.querySelector("mark")?.textContent, "Café")
    assert.equal(tamSelect.status.textContent, "1 result available")

    input(tamSelect.input, "missing place")
    assert.equal(tamSelect.status.textContent, "No results found")
  } finally {
    cleanup()
  }
})

test("advanced local search features can be disabled", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select a region</option>
      <option value="western">Western Oromia</option>
      <option value="oromia">Oromia Regional State</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), {
      fuzzySearch: false,
      highlightMatches: false,
      sortByRelevance: false
    })

    input(tamSelect.input, "oromia")
    assert.deepEqual(tamSelect.visibleItems.map(entry => entry.item.value), ["western", "oromia"])
    assert.equal(tamSelect.dropdown.querySelector("mark"), null)

    input(tamSelect.input, "oromai")
    assert.deepEqual(tamSelect.visibleItems, [])
  } finally {
    cleanup()
  }
})

test("filtering preserves the active option when it remains visible", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()
    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "or")

    input(tamSelect.input, "oromia")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "or")
    assert.equal(tamSelect.input.getAttribute("aria-activedescendant"), tamSelect.visibleItems[tamSelect.activeIndex].id)
  } finally {
    cleanup()
  }
})

test("Escape closes and restores focus while Tab closes without preventing navigation", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()
    keydown(tamSelect.input, "Escape")
    assert.equal(tamSelect.opened, false)
    assert.equal(document.activeElement, tamSelect.input)

    tamSelect.open()
    const tab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true })
    tamSelect.input.dispatchEvent(tab)
    assert.equal(tamSelect.opened, false)
    assert.equal(tab.defaultPrevented, false)
  } finally {
    cleanup()
  }
})

test("disabled options cannot be selected by pointer, keyboard, or the public toggle", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.open()
    const disabledEntry = tamSelect.visibleItems.find(entry => entry.item?.value === "ti")

    tamSelect.dropdown.querySelector(`#${disabledEntry.id}`).click()
    tamSelect.toggleItem(disabledEntry.item)

    assert.notEqual(select.value, "ti")
    assert.notEqual(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "ti")
  } finally {
    cleanup()
  }
})

test("creatable values participate in arrows and Enter and normalized duplicates are blocked", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { creatable: true })

    input(tamSelect.input, "New Region")
    const createIndex = tamSelect.visibleItems.findIndex(entry => entry.type === "create")
    assert.ok(createIndex >= 0)

    keydown(tamSelect.input, "ArrowUp")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].type, "create")
    keydown(tamSelect.input, "Enter")
    assert.equal(select.value, "New Region")

    tamSelect.open()
    input(tamSelect.input, "  new région ")
    assert.equal(tamSelect.visibleItems.some(entry => entry.type === "create"), false)
  } finally {
    cleanup()
  }
})

test("selection and creation dispatch one native change plus documented custom events", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { creatable: true })
    let nativeChanges = 0
    let customChanges = 0
    let creates = 0
    select.addEventListener("change", () => { nativeChanges += 1 })
    select.addEventListener("tam-select:change", event => {
      customChanges += 1
      assert.equal(event.detail.tamSelect, tamSelect)
    })
    select.addEventListener("tam-select:create", () => { creates += 1 })

    tamSelect.selectValue("or")
    tamSelect.createItem("Gambela")

    assert.equal(nativeChanges, 2)
    assert.equal(customChanges, 2)
    assert.equal(creates, 1)
  } finally {
    cleanup()
  }
})

test("ARIA belongs to the focusable input and mirrors Rails form metadata", () => {
  const cleanup = setupDOM(localSelect({ extra: 'required aria-describedby="region-help" aria-invalid="true"' }))
  try {
    const select = document.querySelector("select")
    const label = document.querySelector("label")
    const tamSelect = new TamSelect(select)

    assert.equal(tamSelect.control.hasAttribute("role"), false)
    assert.equal(tamSelect.input.getAttribute("role"), "combobox")
    assert.equal(tamSelect.input.getAttribute("aria-controls"), tamSelect.listboxId)
    assert.equal(tamSelect.input.getAttribute("aria-autocomplete"), "list")
    assert.equal(tamSelect.input.getAttribute("aria-labelledby"), label.id)
    assert.equal(tamSelect.input.getAttribute("aria-describedby"), "region-help")
    assert.equal(tamSelect.input.getAttribute("aria-required"), "true")
    assert.equal(tamSelect.input.getAttribute("aria-invalid"), "true")

    tamSelect.open()
    const ids = Array.from(tamSelect.dropdown.querySelectorAll('[role="option"]'), option => option.id)
    assert.equal(new Set(ids).size, ids.length)
    assert.equal(tamSelect.input.getAttribute("aria-expanded"), "true")
    assert.ok(tamSelect.input.getAttribute("aria-activedescendant"))
  } finally {
    cleanup()
  }
})

test("non-searchable selects use a focusable button combobox and preserve disabled state", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    select.disabled = true
    const tamSelect = new TamSelect(select, { searchable: false })

    assert.ok(tamSelect.trigger instanceof HTMLButtonElement)
    assert.equal(tamSelect.trigger.getAttribute("role"), "combobox")
    assert.equal(tamSelect.trigger.disabled, true)
    assert.equal(tamSelect.trigger.getAttribute("aria-disabled"), "true")

    select.disabled = false
    tamSelect.refresh()
    keydown(tamSelect.trigger, "ArrowDown")
    keydown(tamSelect.trigger, "Enter")
    assert.equal(select.value, "aa")
  } finally {
    cleanup()
  }
})

test("DaisyUI theme applies semantic control and option classes", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { theme: "daisyui" })

    assert.ok(tamSelect.control.classList.contains("input"))
    assert.equal(tamSelect.control.classList.contains("min-h-10"), false)

    tamSelect.open()
    const activeOption = tamSelect.dropdown.querySelector('[role="option"]')
    assert.match(activeOption.className, /bg-primary/)

    tamSelect.select.setAttribute("aria-invalid", "true")
    tamSelect.syncAria()
    assert.ok(tamSelect.control.classList.contains("input-error"))

    tamSelect.select.disabled = true
    tamSelect.applyDisabled()
    assert.ok(tamSelect.control.classList.contains("bg-base-200"))
    assert.ok(tamSelect.control.classList.contains("opacity-50"))
    assert.equal(Object.values(tamSelect.classes).join(" ").includes("dark:"), false)
  } finally {
    cleanup()
  }
})

test("DaisyUI controls match input height and only grow for multiple selection", () => {
  const singleCleanup = setupDOM(localSelect())
  try {
    const single = new TamSelect(document.querySelector("select"), { theme: "daisyui" })
    assert.equal(
      single.control.className,
      "input relative w-full cursor-text rounded-field overflow-hidden text-base-content focus:[--input-color:var(--color-primary)] focus:outline-none focus:outline-offset-0 focus:shadow-none focus-visible:[--input-color:var(--color-primary)] focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:shadow-none focus-within:[--input-color:var(--color-primary)] focus-within:outline-none focus-within:outline-offset-0 focus-within:shadow-none"
    )
  } finally {
    singleCleanup()
  }

  const multipleCleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const multiple = new TamSelect(document.querySelector("select"), { theme: "daisyui" })
    assert.ok(multiple.control.classList.contains("min-h-10"))
    assert.ok(multiple.control.classList.contains("h-auto"))
    assert.ok(multiple.control.classList.contains("flex-wrap"))
  } finally {
    multipleCleanup()
  }
})

test("auto theme detects DaisyUI input and select classes", () => {
  const cleanup = setupDOM(localSelect({ extra: 'class="input w-full"' }))
  try {
    const detected = new TamSelect(document.querySelector("select"), { theme: "auto" })
    assert.equal(detected.theme, "daisyui")
    assert.ok(detected.control.classList.contains("input"))
    assert.ok(detected.control.classList.contains("rounded-field"))
    assert.ok(detected.input.classList.contains("rounded-field"))
  } finally {
    cleanup()
  }

  const defaultCleanup = setupDOM(localSelect())
  try {
    const fallback = new TamSelect(document.querySelector("select"), { theme: "auto" })
    assert.equal(fallback.theme, "default")
    assert.equal(fallback.control.classList.contains("input"), false)
  } finally {
    defaultCleanup()
  }
})

test("native invalid events are reflected without removing native required validation", () => {
  const cleanup = setupDOM(localSelect({ extra: "required" }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    select.dispatchEvent(new Event("invalid", { bubbles: false, cancelable: true }))
    assert.equal(tamSelect.input.getAttribute("aria-invalid"), "true")
    assert.equal(select.required, true)
    assert.equal(document.activeElement, tamSelect.input)

    tamSelect.selectValue("aa")
    assert.equal(tamSelect.input.hasAttribute("aria-invalid"), false)
  } finally {
    cleanup()
  }
})

test("remote search debounces input and never exposes cached results from an old query", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    const calls = []
    globalThis.fetch = async url => {
      calls.push(new URL(url).searchParams.get("q"))
      return jsonResponse({ items: [{ value: calls.at(-1), label: calls.at(-1) }], pagination: {} })
    }
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 15, minQueryLength: 1 })

    input(tamSelect.input, "ad")
    input(tamSelect.input, "addis")
    assert.equal(tamSelect.loading, true)
    assert.match(tamSelect.dropdown.textContent, /Loading/)
    await flush(25)
    await flush()

    assert.deepEqual(calls, ["addis"])
    assert.deepEqual(tamSelect.remoteResults.map(item => item.value), ["addis"])

    input(tamSelect.input, "oro")
    assert.deepEqual(tamSelect.visibleItems, [], "old Addis result is hidden during the new search")
    await flush(25)
    await flush()
    assert.deepEqual(tamSelect.remoteResults.map(item => item.value), ["oro"])
  } finally {
    cleanup()
  }
})

test("new remote searches abort prior requests and stale resolution cannot clear loading", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    const pending = []
    globalThis.fetch = (url, options) => new Promise(resolve => pending.push({ url: String(url), options, resolve }))
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 0, minQueryLength: 1 })

    input(tamSelect.input, "first")
    input(tamSelect.input, "second")
    assert.equal(pending.length, 2)
    assert.equal(pending[0].options.signal.aborted, true)

    pending[0].resolve(jsonResponse({ items: [{ value: "old", label: "Old" }], pagination: {} }))
    await flush()
    assert.equal(tamSelect.loading, true, "the aborted request's finally block cannot hide the current spinner")
    assert.deepEqual(tamSelect.remoteResults, [])

    pending[1].resolve(jsonResponse({ items: [{ value: "new", label: "New" }], pagination: {} }))
    await flush()
    assert.equal(tamSelect.loading, false)
    assert.deepEqual(tamSelect.remoteResults.map(item => item.value), ["new"])
    assert.equal(tamSelect.requestSequence, 2)
  } finally {
    cleanup()
  }
})

test("remote pagination is stable, deduplicated, and updates existing records once", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    let filterCalls = 0
    let pageTwoResolve
    globalThis.fetch = url => {
      const page = Number(new URL(url).searchParams.get("page"))
      if (page === 1) {
        return Promise.resolve(jsonResponse({
          items: [{ value: "1", label: "One" }, { value: "2", label: "Two" }, { value: "2", label: "Duplicate" }],
          pagination: { page: 1, next_page: 2, has_more: true }
        }))
      }
      return new Promise(resolve => { pageTwoResolve = resolve })
    }
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 0 })
    tamSelect.filterLocal = () => { filterCalls += 1 }
    await tamSelect.loadRemote(1)

    assert.deepEqual(tamSelect.remoteResults.map(item => item.value), ["1", "2"])
    const firstItem = tamSelect.remoteResults[0]
    const firstPageTwo = tamSelect.loadRemote(2, true)
    const duplicatePageTwo = tamSelect.loadRemote(2, true)
    assert.equal(tamSelect.loadingPage, 2)

    pageTwoResolve(jsonResponse({
      items: [{ value: "2", label: "Two updated", disabled: true }, { value: "3", label: "Three" }],
      pagination: { page: 2, has_more: false }
    }))
    await Promise.all([firstPageTwo, duplicatePageTwo])

    assert.deepEqual(tamSelect.remoteResults.map(item => item.value), ["1", "2", "3"])
    assert.equal(tamSelect.remoteResults[0], firstItem)
    assert.equal(tamSelect.remoteResults[1].label, "Two updated")
    assert.equal(tamSelect.remoteResults[1].disabled, true)
    assert.equal(tamSelect.remoteResults[1].option.textContent, "Two updated")
    assert.equal(tamSelect.remoteResults[1].option.disabled, true)
    assert.equal(filterCalls, 0, "remote insertion does not repeatedly invoke local filtering")
  } finally {
    cleanup()
  }
})

test("remote errors replace loading and emit an accessible error state", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    globalThis.fetch = async () => jsonResponse({}, { ok: false, status: 503 })
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { remoteUrl: "/regions", debounce: 0 })
    let errors = 0
    select.addEventListener("tam-select:error", () => { errors += 1 })
    tamSelect.open()
    await flush()

    assert.equal(tamSelect.loading, false)
    assert.match(tamSelect.error, /503/)
    assert.equal(tamSelect.dropdown.querySelector('[role="alert"]').textContent, "Request failed (503)")
    assert.equal(errors, 1)
  } finally {
    cleanup()
  }
})

// ─── Option Groups ────────────────────────────────────────────────────

test("option groups render section headers and navigate through them", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <optgroup label="Africa">
        <option value="et">Ethiopia</option>
        <option value="ke">Kenya</option>
      </optgroup>
      <optgroup label="Asia">
        <option value="jp">Japan</option>
        <option value="cn">China</option>
      </optgroup>
    </select>
  `)
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)

    const headers = tamSelect.dropdown.querySelectorAll("[data-tam-select-group]")
    assert.equal(headers.length, 0, "dropdown not yet open")

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.opened, true)
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "et")
    const openHeaders = tamSelect.dropdown.querySelectorAll("[data-tam-select-group]")
    assert.equal(openHeaders.length, 2)
    assert.equal(openHeaders[0].textContent, "Africa")
    assert.equal(openHeaders[1].textContent, "Asia")

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "ke")
    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "jp")

    keydown(tamSelect.input, "Enter")
    assert.equal(select.value, "jp")
  } finally {
    cleanup()
  }
})

test("option groups filter correctly and hide empty groups", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <optgroup label="Africa">
        <option value="et">Ethiopia</option>
        <option value="ke">Kenya</option>
      </optgroup>
      <optgroup label="Asia">
        <option value="jp">Japan</option>
      </optgroup>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    input(tamSelect.input, "ethiopia")
    assert.equal(tamSelect.opened, true)

    const headers = tamSelect.dropdown.querySelectorAll("[data-tam-select-group]")
    assert.equal(headers.length, 1)
    assert.equal(headers[0].textContent, "Africa")
    const values = tamSelect.visibleItems.filter(e => e.type === "item").map(e => e.item.value)
    assert.deepEqual(values, ["et"])
  } finally {
    cleanup()
  }
})

// ─── Animations ───────────────────────────────────────────────────────

test("dropdown gets animation classes when opened and closed", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.ok(tamSelect.dropdown.classList.contains("origin-top-center"))

    tamSelect.open()
    assert.ok(tamSelect.dropdown.classList.contains("scale-y-100"))
    assert.ok(tamSelect.dropdown.classList.contains("opacity-100"))
    assert.ok(tamSelect.dropdown.classList.contains("pointer-events-auto"))

    tamSelect.close()
    assert.ok(tamSelect.dropdown.classList.contains("scale-y-[0.98]"))
    assert.ok(tamSelect.dropdown.classList.contains("opacity-0"))
    assert.ok(tamSelect.dropdown.classList.contains("pointer-events-none"))
  } finally {
    cleanup()
  }
})

test("animations can be disabled", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    assert.equal(tamSelect.dropdown.classList.contains("origin-top-center"), false)

    tamSelect.open()
    assert.equal(tamSelect.dropdown.classList.contains("scale-y-100"), false)

    tamSelect.close()
    assert.ok(tamSelect.dropdown.classList.contains("hidden"))
  } finally {
    cleanup()
  }
})

// ─── Type-ahead ───────────────────────────────────────────────────────

test("type-ahead jumps to the first matching option on rapid typing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()

    keydown(tamSelect.input, "s")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "sn")
  } finally {
    cleanup()
  }
})

test("type-ahead buffers rapid characters and resets after 500ms", async () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="sidama">Sidama</option>
      <option value="south">South</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()

    keydown(tamSelect.input, "s")
    keydown(tamSelect.input, "o")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "south")

    await flush(600)
    keydown(tamSelect.input, "s")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "sidama")
  } finally {
    cleanup()
  }
})

// ─── Home/End Navigation ──────────────────────────────────────────────

test("Home and End jump to first and last selectable option", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()

    keydown(tamSelect.input, "End")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "cf")

    keydown(tamSelect.input, "Home")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "aa")
  } finally {
    cleanup()
  }
})

test("Home skips disabled options", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="a" disabled>First</option>
      <option value="b">Second</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()

    keydown(tamSelect.input, "End")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "b")

    keydown(tamSelect.input, "Home")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "b")
  } finally {
    cleanup()
  }
})

// ─── Ctrl+A Toggle All ────────────────────────────────────────────────

test("Ctrl+A selects all visible options in multi-select mode", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.open()

    keydown(tamSelect.input, "a", { ctrlKey: true })
    assert.deepEqual(tamSelect.value, ["aa", "or", "sn", "cf"])

    keydown(tamSelect.input, "a", { ctrlKey: true })
    assert.deepEqual(tamSelect.value, [])
  } finally {
    cleanup()
  }
})

test("Ctrl+A does not select disabled options", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { searchable: false })
    tamSelect.open()
    keydown(tamSelect.trigger, "a", { ctrlKey: true })

    assert.ok(!select.querySelector('option[value="ti"]').selected, "disabled option excluded")
  } finally {
    cleanup()
  }
})

// ─── Maximum Selection Length ──────────────────────────────────────────

test("maximumSelectionLength prevents selecting beyond the limit", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { maximumSelectionLength: 2 })

    tamSelect.selectValue("aa")
    tamSelect.selectValue("or")
    assert.deepEqual(tamSelect.value, ["aa", "or"])
    assert.ok(tamSelect.selectionLimitReached)
    assert.ok(tamSelect.input.disabled)

    tamSelect.selectValue("sn")
    assert.deepEqual(tamSelect.value, ["aa", "or"])

    tamSelect.deselect("aa")
    assert.equal(tamSelect.selectionLimitReached, false)
    assert.equal(tamSelect.input.disabled, false)
  } finally {
    cleanup()
  }
})

// ─── Maximum Input Length ──────────────────────────────────────────────

test("maximumInputLength sets maxlength on the search input", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { maximumInputLength: 10 })
    assert.equal(tamSelect.input.maxLength, 10)
  } finally {
    cleanup()
  }
})

// ─── Minimum Results for Search ───────────────────────────────────────

test("minimumResultsForSearch hides search icon when few options exist", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { minimumResultsForSearch: 10 })
    assert.equal(tamSelect.searchVisible, false)

    tamSelect.open()
    assert.ok(tamSelect.searchIcon.classList.contains("hidden"), "search icon hidden when few options")
  } finally {
    cleanup()
  }
})

// ─── Select on Close ──────────────────────────────────────────────────

test("selectOnClose selects the active option when dropdown closes", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { selectOnClose: true })
    tamSelect.open()

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "or")

    keydown(tamSelect.input, "Escape")
    assert.equal(select.value, "or")
    assert.equal(tamSelect.opened, false)
    await flush()
  } finally {
    cleanup()
  }
})

test("selectOnClose is off by default", async () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.open()

    keydown(tamSelect.input, "ArrowDown")
    keydown(tamSelect.input, "Escape")
    await flush()
    assert.equal(select.value, "")
  } finally {
    cleanup()
  }
})

// ─── Token Separators ─────────────────────────────────────────────────

test("tokenSeparators splits typed input into tags in multi-select", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { creatable: true, tokenSeparators: [","] })

    tamSelect.input.value = "New One,New Two"
    tamSelect.input.dispatchEvent(new Event("input", { bubbles: true }))

    assert.ok(select.querySelector('option[value="New One"]'), "first token created")
    assert.ok(select.querySelector('option[value="New Two"]'), "second token created")
    assert.equal(tamSelect.input.value, "")
  } finally {
    cleanup()
  }
})

// ─── Sorter ───────────────────────────────────────────────────────────

test("sorter applies custom sort to filtered results", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="aa">Alpha</option>
      <option value="bb">Beta</option>
      <option value="cc">Charlie</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), {
      sortByRelevance: false,
      sorter: items => [...items].reverse()
    })
    tamSelect.open()
    input(tamSelect.input, "a")
    const values = tamSelect.visibleItems.map(e => e.item?.value)
    assert.deepEqual(values, ["cc", "bb", "aa"])
  } finally {
    cleanup()
  }
})

// ─── Width ────────────────────────────────────────────────────────────

test("width option sets wrapper inline style", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { width: "300px" })
    assert.equal(tamSelect.wrapper.style.width, "300px")
  } finally {
    cleanup()
  }
})

test("width resolve does not set inline style", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { width: "resolve" })
    assert.equal(tamSelect.wrapper.style.width, "")
  } finally {
    cleanup()
  }
})

// ─── Focus/Blur API ───────────────────────────────────────────────────

test("focus and blur control the focus target", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.focus()
    assert.equal(document.activeElement, tamSelect.input)

    tamSelect.blur()
    assert.notEqual(document.activeElement, tamSelect.input)
  } finally {
    cleanup()
  }
})

test("focus does nothing when select is disabled", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    select.disabled = true
    const tamSelect = new TamSelect(select)
    tamSelect.focus()
    assert.notEqual(document.activeElement, tamSelect.input)
  } finally {
    cleanup()
  }
})

// ─── addData / removeData ─────────────────────────────────────────────

test("addData adds options and removeData removes them", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    let adds = 0
    let removes = 0
    select.addEventListener("tam-select:data:add", () => { adds += 1 })
    select.addEventListener("tam-select:data:remove", () => { removes += 1 })

    tamSelect.addData({ value: "nw", label: "New Place" })
    assert.equal(select.querySelector("option[value=\"nw\"]").textContent, "New Place")
    assert.ok(tamSelect.items.some(i => i.value === "nw"))
    assert.equal(adds, 1)

    tamSelect.removeData("nw")
    assert.equal(select.querySelector("option[value=\"nw\"]"), null)
    assert.equal(tamSelect.items.some(i => i.value === "nw"), false)
    assert.equal(removes, 1)
  } finally {
    cleanup()
  }
})

test("addData accepts an array of items", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))

    tamSelect.addData([
      { value: "x1", label: "X One" },
      { value: "x2", label: "X Two" }
    ])
    assert.ok(tamSelect.items.some(i => i.value === "x1"))
    assert.ok(tamSelect.items.some(i => i.value === "x2"))
  } finally {
    cleanup()
  }
})

// ─── Custom Empty and Loading States ──────────────────────────────────

test("emptyState renders custom content when no options exist", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), {
      emptyState: "Nothing here"
    })
    tamSelect.open()
    input(tamSelect.input, "zzzzzzz")

    assert.match(tamSelect.dropdown.textContent, /Nothing here/)
  } finally {
    cleanup()
  }
})

test("emptyState accepts a function for custom rendering", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), {
      emptyState: (el) => { el.innerHTML = "<strong>Custom</strong>" }
    })
    tamSelect.open()
    input(tamSelect.input, "zzzzzzz")

    assert.ok(tamSelect.dropdown.querySelector("strong"))
  } finally {
    cleanup()
  }
})

// ─── Lazy Load Images ─────────────────────────────────────────────────

test("lazyLoadImages creates images with data-lazy-src instead of src", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="a" data-image="/a.jpg">A</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { lazyLoadImages: true })
    tamSelect.open()

    const img = tamSelect.dropdown.querySelector("img")
    assert.equal(img.dataset.lazySrc, "/a.jpg")
    assert.equal(img.src, "")
  } finally {
    cleanup()
  }
})

test("without lazyLoadImages, images load immediately", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="a" data-image="/a.jpg">A</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { lazyLoadImages: false })
    tamSelect.open()

    const img = tamSelect.dropdown.querySelector("img")
    assert.ok(img.src.includes("/a.jpg"))
  } finally {
    cleanup()
  }
})

// ─── Long Value Truncation ────────────────────────────────────────────

test("single-select truncates long selected value with ellipsis", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="long" selected>This is an extremely long option label that should definitely be truncated with ellipsis instead of overflowing the container</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    const label = tamSelect.values.querySelector("span.truncate")
    assert.ok(label, "truncated label exists")
    assert.equal(label.textContent, "This is an extremely long option label that should definitely be truncated with ellipsis instead of overflowing the container")
    assert.ok(tamSelect.control.classList.contains("overflow-hidden"), "control has overflow-hidden")
  } finally {
    cleanup()
  }
})

test("multi-select tags truncate long labels", () => {
  const cleanup = setupDOM(`
    <select multiple>
      <option value="">Select</option>
      <option value="a" selected>Short</option>
      <option value="b" selected>This is a very long tag label that should be truncated inside the pill</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    const tags = tamSelect.values.querySelectorAll("span")
    const tagLabels = Array.from(tags).filter(el => el.classList.contains("truncate"))
    assert.equal(tagLabels.length, 2)
    assert.equal(tagLabels[0].textContent, "Short")
    assert.equal(tagLabels[1].textContent, "This is a very long tag label that should be truncated inside the pill")
    assert.ok(tamSelect.control.classList.contains("overflow-hidden"), "control clips overflow")
  } finally {
    cleanup()
  }
})

test("placeholder truncates when control is narrow", () => {
  const cleanup = setupDOM(localSelect({ extra: 'style="width: 120px"' }))
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { width: "120px" })
    const placeholder = tamSelect.values.querySelector("span")
    assert.ok(placeholder, "placeholder exists")
    assert.ok(placeholder.classList.contains("truncate"), "placeholder has truncate class")
    assert.equal(placeholder.textContent, "Select a region")
  } finally {
    cleanup()
  }
})

test("dropdown options truncate long labels", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="long">This is an extremely long option label that extends far beyond the normal width of a dropdown menu</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    tamSelect.open()
    const label = tamSelect.dropdown.querySelector("span.truncate")
    assert.ok(label, "option label has truncate class")
    assert.equal(label.style.overflow, "hidden")
    assert.equal(label.style.textOverflow, "ellipsis")
    assert.equal(label.style.whiteSpace, "nowrap")
  } finally {
    cleanup()
  }
})

test("long selected value with detail truncates both lines", () => {
  const cleanup = setupDOM(`
    <select>
      <option value="">Select</option>
      <option value="long" selected data-detail="This is also a very long detail line that should truncate independently from the label">Extremely long label that needs truncation</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    const spans = tamSelect.values.querySelectorAll("span.truncate")
    assert.equal(spans.length, 2, "both label and detail are truncated")
    assert.equal(spans[0].textContent, "Extremely long label that needs truncation")
    assert.equal(spans[1].textContent, "This is also a very long detail line that should truncate independently from the label")
  } finally {
    cleanup()
  }
})

test("control does not grow beyond wrapper width with long values", () => {
  const cleanup = setupDOM(`
    <div style="width: 200px">
      <select>
        <option value="">Select</option>
        <option value="long" selected>ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ</option>
      </select>
    </div>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.ok(tamSelect.control.classList.contains("overflow-hidden"))
    assert.equal(tamSelect.wrapper.style.width, "")
    const content = tamSelect.values.querySelector("span")
    assert.ok(content, "content element exists")
  } finally {
    cleanup()
  }
})

test("input does not overflow when visible alongside long selected value", () => {
  const cleanup = setupDOM(`
    <select multiple>
      <option value="">Select</option>
      <option value="a" selected>Short tag</option>
    </select>
  `)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.ok(tamSelect.control.classList.contains("overflow-hidden"))
    assert.equal(tamSelect.input.classList.contains("shrink"), true, "input has shrink class")
    assert.equal(tamSelect.input.classList.contains("basis-0"), true, "input has basis-0 class")
  } finally {
    cleanup()
  }
})

// ─── Virtual Scrolling ────────────────────────────────────────────────

test("virtualScroll renders only visible items with spacers for large lists", () => {
  const options = Array.from({ length: 200 }, (_, i) => `<option value="${i}">Item ${i}</option>`).join("")
  const cleanup = setupDOM(`<select><option value="">Select</option>${options}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true, virtualScrollThreshold: 5 })
    tamSelect.open()

    assert.ok(tamSelect.isVirtualScroll, "virtual scroll is active")
    const optionElements = tamSelect.dropdown.querySelectorAll("[role=\"option\"]")
    assert.ok(optionElements.length < 200, `only ${optionElements.length} options rendered, not all 200`)
    assert.ok(optionElements.length > 0, "some options are rendered")

    const bottomSpacer = tamSelect.dropdown.querySelector("[data-virtual-spacer=\"bottom\"]")
    assert.ok(bottomSpacer, "bottom spacer exists")
    assert.ok(parseInt(bottomSpacer.style.height) > 0, "bottom spacer has height")
  } finally {
    cleanup()
  }
})

test("virtualScroll auto-enables when item count exceeds threshold", () => {
  const options = Array.from({ length: 50 }, (_, i) => `<option value="${i}">Item ${i}</option>`).join("")
  const cleanup = setupDOM(`<select><option value="">Select</option>${options}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScrollThreshold: 10 })
    tamSelect.open()

    assert.ok(tamSelect.isVirtualScroll, "virtual scroll auto-enabled")
    const optionElements = tamSelect.dropdown.querySelectorAll("[role=\"option\"]")
    assert.ok(optionElements.length < 50, `only ${optionElements.length} options rendered`)
  } finally {
    cleanup()
  }
})

test("virtualScroll does not activate for small lists", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScrollThreshold: 100 })
    tamSelect.open()

    assert.equal(tamSelect.isVirtualScroll, false, "virtual scroll not active for small list")
    const optionElements = tamSelect.dropdown.querySelectorAll("[role=\"option\"]")
    assert.equal(optionElements.length, 5, "all options rendered")
  } finally {
    cleanup()
  }
})

test("virtualScroll resets when dropdown closes", () => {
  const options = Array.from({ length: 200 }, (_, i) => `<option value="${i}">Item ${i}</option>`).join("")
  const cleanup = setupDOM(`<select><option value="">Select</option>${options}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true, virtualScrollThreshold: 5 })
    tamSelect.open()
    assert.ok(tamSelect.isVirtualScroll)

    tamSelect.close()
    assert.equal(tamSelect.isVirtualScroll, false, "virtual scroll reset on close")
  } finally {
    cleanup()
  }
})

test("virtualScroll keyboard navigation works with large lists", () => {
  const options = Array.from({ length: 200 }, (_, i) => `<option value="${i}">Item ${i}</option>`).join("")
  const cleanup = setupDOM(`<select><option value="">Select</option>${options}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true, virtualScrollThreshold: 5 })

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "0")

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "1")

    keydown(tamSelect.input, "End")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "199")

    keydown(tamSelect.input, "Home")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "0")
  } finally {
    cleanup()
  }
})

test("virtualScroll search filters and re-enables virtual rendering", () => {
  const options = Array.from({ length: 200 }, (_, i) => `<option value="item${i}">Item ${i}</option>`).join("")
  const cleanup = setupDOM(`<select><option value="">Select</option>${options}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true, virtualScrollThreshold: 5 })
    tamSelect.open()
    assert.ok(tamSelect.isVirtualScroll)

    input(tamSelect.input, "item1")
    const filtered = tamSelect.dropdown.querySelectorAll("[role=\"option\"]")
    assert.ok(filtered.length > 0, "filtered options rendered")
    assert.ok(filtered.length < 200, `only ${filtered.length} options after filter`)
  } finally {
    cleanup()
  }
})

// ─── RTL Support ─────────────────────────────────────────────────────

test("dir option sets wrapper dir attribute", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { dir: "rtl" })
    assert.equal(tamSelect.wrapper.getAttribute("dir"), "rtl")
    assert.equal(tamSelect.dir, "rtl")
  } finally {
    cleanup()
  }
})

test("dir auto-detects from document element", () => {
  const cleanup = setupDOM(localSelect())
  try {
    document.documentElement.setAttribute("dir", "rtl")
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.equal(tamSelect.dir, "rtl")
    assert.equal(tamSelect.wrapper.getAttribute("dir"), "rtl")
    document.documentElement.removeAttribute("dir")
  } finally {
    cleanup()
  }
})

test("dir auto-detects from select element", () => {
  const cleanup = setupDOM(localSelect({ extra: 'dir="rtl"' }))
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.equal(tamSelect.dir, "rtl")
    assert.equal(tamSelect.wrapper.getAttribute("dir"), "rtl")
  } finally {
    cleanup()
  }
})

test("dir defaults to ltr when no direction is set", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.equal(tamSelect.dir, "ltr")
    assert.equal(tamSelect.wrapper.getAttribute("dir"), "ltr")
  } finally {
    cleanup()
  }
})

test("RTL layout uses logical properties for clear and chevron", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { dir: "rtl" })
    assert.ok(tamSelect.clearButton.classList.contains("ms-auto"), "clear has ms-auto")
    assert.ok(tamSelect.chevron.classList.contains("ms-auto"), "chevron has ms-auto")
    assert.ok(tamSelect.input.classList.contains("text-start"), "input has text-start")
  } finally {
    cleanup()
  }
})

test("RTL single select works with keyboard navigation", () => {
  const cleanup = setupDOM(localSelect({ extra: 'dir="rtl"' }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { dir: "rtl" })

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.opened, true)
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "aa")

    keydown(tamSelect.input, "ArrowDown")
    assert.equal(tamSelect.visibleItems[tamSelect.activeIndex].item.value, "or")

    keydown(tamSelect.input, "Enter")
    assert.equal(select.value, "or")
  } finally {
    cleanup()
  }
})

test("RTL multi select works with selection", () => {
  const cleanup = setupDOM(localSelect({ multiple: true, extra: 'dir="rtl"' }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { dir: "rtl" })

    tamSelect.selectValue("aa")
    tamSelect.selectValue("or")
    assert.deepEqual(tamSelect.value, ["aa", "or"])

    tamSelect.clear()
    assert.deepEqual(tamSelect.value, [])
  } finally {
    cleanup()
  }
})

// ─── Drag and Drop ───────────────────────────────────────────────────

test("tags are draggable when draggable option is true", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.options[1].selected = true
    select.options[2].selected = true
    const tamSelect = new TamSelect(select, { draggable: true })

    const tags = tamSelect.values.querySelectorAll("[data-tag-value]")
    assert.equal(tags.length, 2)
    assert.equal(tags[0].getAttribute("draggable"), "true")
    assert.equal(tags[0].style.cursor, "grab")
    assert.equal(tags[1].getAttribute("draggable"), "true")
  } finally {
    cleanup()
  }
})

test("tags are not draggable by default", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.options[1].selected = true
    const tamSelect = new TamSelect(select)

    const tag = tamSelect.values.querySelector("[data-tag-value]")
    assert.equal(tag.getAttribute("draggable"), null)
  } finally {
    cleanup()
  }
})

test("drag and drop reorders selected tags", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.options[1].selected = true
    select.options[2].selected = true
    select.options[3].selected = true
    const tamSelect = new TamSelect(select, { draggable: true })

    assert.deepEqual(tamSelect.value, ["aa", "or", "ti"])

    const tags = Array.from(tamSelect.values.querySelectorAll("[data-tag-value]"))
    const sourceTag = tags[0]
    const targetTag = tags[2]

    let reorderFired = false
    select.addEventListener("tam-select:reorder", () => { reorderFired = true })

    const dragStartEvent = new Event("dragstart", { bubbles: true, cancelable: true })
    dragStartEvent.dataTransfer = { effectAllowed: "", setData: () => {}, getData: () => "aa" }
    sourceTag.dispatchEvent(dragStartEvent)

    const dropEvent = new Event("drop", { bubbles: true, cancelable: true })
    dropEvent.preventDefault = () => {}
    dropEvent.dataTransfer = { getData: () => "aa" }
    targetTag.dispatchEvent(dropEvent)

    assert.ok(reorderFired, "tam-select:reorder event dispatched")
  } finally {
    cleanup()
  }
})

test("dragging same tag to same position is a no-op", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.options[1].selected = true
    select.options[2].selected = true
    const tamSelect = new TamSelect(select, { draggable: true })

    tamSelect.draggedItem = tamSelect.items.find(i => i.value === "aa")

    let reorderFired = false
    select.addEventListener("tam-select:reorder", () => { reorderFired = true })

    const targetItem = tamSelect.items.find(i => i.value === "aa")
    const dropEvent = new Event("drop", { bubbles: true, cancelable: true })
    dropEvent.preventDefault = () => {}
    dropEvent.dataTransfer = { getData: () => "aa" }
    tamSelect.onTagDrop(dropEvent, targetItem)

    assert.equal(reorderFired, false, "no reorder for same target")
  } finally {
    cleanup()
  }
})

test("drag and drop does not work on disabled select", () => {
  const cleanup = setupDOM(localSelect({ multiple: true }))
  try {
    const select = document.querySelector("select")
    select.disabled = true
    select.options[1].selected = true
    const tamSelect = new TamSelect(select, { draggable: true })

    const tag = tamSelect.values.querySelector("[data-tag-value]")
    assert.equal(tag.getAttribute("draggable"), null, "disabled select tags not draggable")
  } finally {
    cleanup()
  }
})

// ─── Animation Configuration ───

test("animationDuration sets CSS custom property on dropdown", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationDuration: 300 })

    assert.equal(tamSelect.options.animationDuration, 300)
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "300ms")
  } finally {
    cleanup()
  }
})

test("animationDuration default is 150ms", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)

    assert.equal(tamSelect.options.animationDuration, 150)
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "150ms")
  } finally {
    cleanup()
  }
})

test("animationEasing sets CSS custom property on dropdown", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationEasing: "cubic-bezier(0.4, 0, 0.2, 1)" })

    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.4, 0, 0.2, 1)")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "cubic-bezier(0.4, 0, 0.2, 1)")
  } finally {
    cleanup()
  }
})

test("animationEasing default is ease-out", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)

    assert.equal(tamSelect.options.animationEasing, "ease-out")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "ease-out")
  } finally {
    cleanup()
  }
})

test("animations: false disables animation classes and custom properties", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, animationDuration: 300 })

    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "")
  } finally {
    cleanup()
  }
})

test("custom animation duration affects close timer", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationDuration: 500 })

    tamSelect.open()
    assert.equal(tamSelect.opened, true)

    // Close triggers timer = animationDuration + 50 = 550ms
    const start = Date.now()
    tamSelect.close()
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

// ─── Animation Presets ───

test("animationPreset 'material' sets duration and easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "material" })

    assert.equal(tamSelect.options.animationDuration, 250)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.4, 0, 0.2, 1)")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "250ms")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "cubic-bezier(0.4, 0, 0.2, 1)")
  } finally {
    cleanup()
  }
})

test("animationPreset 'spring' sets duration and easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "spring" })

    assert.equal(tamSelect.options.animationDuration, 400)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.34, 1.56, 0.64, 1)")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "400ms")
  } finally {
    cleanup()
  }
})

test("animationPreset 'snappy' sets short duration and ease-in", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "snappy" })

    assert.equal(tamSelect.options.animationDuration, 100)
    assert.equal(tamSelect.options.animationEasing, "ease-in")
  } finally {
    cleanup()
  }
})

test("animationPreset 'smooth' sets long duration and cubic ease", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "smooth" })

    assert.equal(tamSelect.options.animationDuration, 300)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.25, 0.1, 0.25, 1)")
  } finally {
    cleanup()
  }
})

test("animationPreset 'none' disables animation", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "none" })

    assert.equal(tamSelect.options.animationDuration, 0)
    assert.equal(tamSelect.options.animationEasing, "ease")
  } finally {
    cleanup()
  }
})

test("animationPreset 'bounce' sets long duration with overshoot easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "bounce" })

    assert.equal(tamSelect.options.animationDuration, 500)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.68, -0.55, 0.27, 1.55)")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "500ms")
  } finally {
    cleanup()
  }
})

test("animationPreset 'elastic' sets longest duration with elastic easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "elastic" })

    assert.equal(tamSelect.options.animationDuration, 600)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.68, -0.6, 0.32, 1.6)")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "cubic-bezier(0.68, -0.6, 0.32, 1.6)")
  } finally {
    cleanup()
  }
})

test("animationPreset 'fade' sets linear easing for opacity-only transitions", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "fade" })

    assert.equal(tamSelect.options.animationDuration, 200)
    assert.equal(tamSelect.options.animationEasing, "linear")
  } finally {
    cleanup()
  }
})

test("animationPreset 'pop' sets quick ease-out-back easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "pop" })

    assert.equal(tamSelect.options.animationDuration, 200)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
  } finally {
    cleanup()
  }
})

test("animationPreset 'slide' sets deceleration easing for directional transitions", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animationPreset: "slide" })

    assert.equal(tamSelect.options.animationDuration, 250)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.25, 0.46, 0.45, 0.94)")
  } finally {
    cleanup()
  }
})

test("animationPreset overrides animationDuration and animationEasing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, {
      animationPreset: "material",
      animationDuration: 999,
      animationEasing: "linear"
    })

    // Preset wins over individual values
    assert.equal(tamSelect.options.animationDuration, 250)
    assert.equal(tamSelect.options.animationEasing, "cubic-bezier(0.4, 0, 0.2, 1)")
  } finally {
    cleanup()
  }
})

test("null animationPreset uses individual duration and easing", () => {
  const cleanup = setupDOM(localSelect())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, {
      animationPreset: null,
      animationDuration: 350,
      animationEasing: "linear"
    })

    assert.equal(tamSelect.options.animationDuration, 350)
    assert.equal(tamSelect.options.animationEasing, "linear")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-duration"), "350ms")
    assert.equal(tamSelect.dropdown.style.getPropertyValue("--tam-easing"), "linear")
  } finally {
    cleanup()
  }
})
