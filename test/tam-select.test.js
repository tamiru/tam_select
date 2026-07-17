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
