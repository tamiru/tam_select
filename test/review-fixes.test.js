import test from "node:test"
import assert from "node:assert/strict"
import { Application } from "@hotwired/stimulus"
import TamSelect from "../src/tam-select.js"
import TamSelectController from "../rails/app/javascript/controllers/tam_select_controller.js"
import { flush, input, jsonResponse, keydown, setupDOM } from "./dom_helper.js"

const regions = (selected = "", { empty = true } = {}) => `
  <select>
    ${empty ? '<option value="">Pick</option>' : ""}
    <option value="aa" ${selected === "aa" ? "selected" : ""}>Addis</option>
    <option value="or" ${selected === "or" ? "selected" : ""}>Oromia</option>
    <option value="sn" ${selected === "sn" ? "selected" : ""}>Sidama</option>
  </select>
`
const activeValue = tamSelect => tamSelect.visibleItems[tamSelect.activeIndex]?.item?.value
const dragEvent = type => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  event.dataTransfer = { effectAllowed: "", dropEffect: "", setData() {}, getData() { return "" } }
  return event
}
const countEvents = (select, ...names) => {
  const counts = Object.fromEntries(names.map(name => [name, 0]))
  names.forEach(name => select.addEventListener(name, () => { counts[name] += 1 }))
  return counts
}

// ─── Selection state ─────────────────────────────────────────────────

test("the native select is the source of truth after a programmatic value change", () => {
  const cleanup = setupDOM(regions("aa"))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    select.value = "or"
    assert.equal(tamSelect.value, "or")
    assert.deepEqual(tamSelect.selectedItems().map(item => item.value), ["or"])
  } finally {
    cleanup()
  }
})

test("duplicate option values select and deselect the option that was used", () => {
  const cleanup = setupDOM(`<select><option value="">-</option><option value="x">First</option><option value="x">Second</option></select>`)
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.open()
    tamSelect.results.querySelectorAll('[role="option"]')[1].click()
    assert.equal(select.selectedIndex, 2)
    assert.match(tamSelect.values.textContent, /Second/)
  } finally {
    cleanup()
  }

  const cleanupMultiple = setupDOM(`<select multiple><option value="x">First</option><option value="x" selected>Second</option></select>`)
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.values.querySelector("[data-tag-value] button").click()
    assert.equal(select.options[1].selected, false, "the tag's own option is removed")
  } finally {
    cleanupMultiple()
  }
})

test("re-picking the current single value emits no change", () => {
  const cleanup = setupDOM(regions("aa"))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    const counts = countEvents(select, "change", "tam-select:select")
    tamSelect.open()
    keydown(tamSelect.input, "Enter")
    assert.deepEqual(counts, { change: 0, "tam-select:select": 0 })
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("clear empties a single select through its empty option, and is hidden without one", () => {
  const cleanup = setupDOM(regions("or"))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.clearButton.click()
    assert.equal(select.value, "")
    assert.equal(tamSelect.value, "")
  } finally {
    cleanup()
  }

  const cleanupNoEmpty = setupDOM(regions("or", { empty: false }))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    const counts = countEvents(select, "change", "tam-select:clear")
    assert.ok(tamSelect.clearButton.classList.contains("hidden"), "nothing to clear to")
    tamSelect.clear()
    assert.equal(select.value, "or")
    assert.deepEqual(counts, { change: 0, "tam-select:clear": 0 })
  } finally {
    cleanupNoEmpty()
  }
})

test("selectOnClose keeps an already selected option and selects only once", () => {
  const cleanup = setupDOM(regions().replace("<select>", "<select multiple>").replace('<option value="">Pick</option>', ""))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { selectOnClose: true, animations: false })
    tamSelect.open()
    keydown(tamSelect.input, "Enter")
    assert.deepEqual(tamSelect.value, ["aa"])
    tamSelect.close()
    assert.deepEqual(tamSelect.value, ["aa"], "closing does not toggle the active option off")
  } finally {
    cleanup()
  }

  const cleanupSingle = setupDOM(regions())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { selectOnClose: true, animations: false })
    const counts = countEvents(select, "change", "tam-select:select")
    tamSelect.open()
    keydown(tamSelect.input, "ArrowDown")
    keydown(tamSelect.input, "Enter")
    assert.deepEqual(counts, { change: 1, "tam-select:select": 1 })
  } finally {
    cleanupSingle()
  }
})

test("a single select reopens on its selection, not the last highlighted option", () => {
  const cleanup = setupDOM(regions("aa"))
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    tamSelect.open()
    keydown(tamSelect.input, "ArrowDown")
    keydown(tamSelect.input, "ArrowDown")
    keydown(tamSelect.input, "Escape")
    tamSelect.open()
    assert.equal(activeValue(tamSelect), "aa")
  } finally {
    cleanup()
  }
})

test("Ctrl+A toggles off once the selection limit is reached", () => {
  const cleanup = setupDOM(regions().replace("<select>", "<select multiple>").replace('<option value="">Pick</option>', ""))
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { maximumSelectionLength: 2 })
    tamSelect.open()
    keydown(tamSelect.input, "a", { ctrlKey: true })
    assert.deepEqual(tamSelect.value, ["aa", "or"])
    keydown(tamSelect.input, "a", { ctrlKey: true })
    assert.deepEqual(tamSelect.value, [])
  } finally {
    cleanup()
  }
})

test("disabling an open select closes it and blocks selection", async () => {
  const cleanup = setupDOM(regions())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false })
    tamSelect.open()
    const option = tamSelect.results.querySelector('[data-value="or"]')
    select.disabled = true
    tamSelect.refresh()
    await flush()
    assert.equal(tamSelect.opened, false)
    option.click()
    tamSelect.setValue("sn")
    assert.equal(select.value, "sn", "programmatic setValue still applies")
    tamSelect.selectValue("or")
    tamSelect.clear()
    assert.equal(select.value, "sn", "user-facing selection methods do nothing while disabled")
  } finally {
    cleanup()
  }
})

// ─── Search, typeahead, and rendering ────────────────────────────────

test("a growing typeahead buffer keeps the current match", () => {
  const cleanup = setupDOM(`<select><option value="">-</option><option value="1">Apple</option><option value="2">Banana</option><option value="3">Bandana</option></select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { searchable: false })
    tamSelect.open()
    keydown(tamSelect.trigger, "b")
    keydown(tamSelect.trigger, "a")
    assert.equal(activeValue(tamSelect), "2")
  } finally {
    cleanup()
  }
})

test("custom sorters apply inside optgroups", () => {
  const cleanup = setupDOM(`<select><optgroup label="G"><option value="z">Zebra</option><option value="a">Apple</option></optgroup></select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), {
      sorter: items => [...items].sort((left, right) => left.label.localeCompare(right.label))
    })
    tamSelect.open()
    assert.deepEqual(tamSelect.visibleItems.filter(entry => entry.type === "item").map(entry => entry.item.label), ["Apple", "Zebra"])
  } finally {
    cleanup()
  }
})

test("noResultsState wins over emptyState for a search with no matches", () => {
  const cleanup = setupDOM(regions())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { emptyState: "No options yet", noResultsState: "No match" })
    tamSelect.open()
    input(tamSelect.input, "zzzzz")
    assert.match(tamSelect.dropdown.textContent, /No match/)
    assert.doesNotMatch(tamSelect.dropdown.textContent, /No options yet/)
  } finally {
    cleanup()
  }
})

test("direction is inherited from the nearest dir ancestor", () => {
  const cleanup = setupDOM(`<div dir="rtl">${regions()}</div>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.equal(tamSelect.wrapper.getAttribute("dir"), "rtl")
  } finally {
    cleanup()
  }
})

test("a hidden search panel leaves focus and aria-activedescendant on the trigger", () => {
  const cleanup = setupDOM(regions())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { minimumResultsForSearch: 10 })
    tamSelect.open()
    assert.ok(tamSelect.searchPanel.classList.contains("hidden"))
    assert.ok(tamSelect.trigger.getAttribute("aria-activedescendant"))
    assert.equal(tamSelect.input.hasAttribute("aria-activedescendant"), false)
    assert.equal(document.activeElement, tamSelect.trigger)
  } finally {
    cleanup()
  }
})

test("virtual scrolling renders the active row on navigation and on open", () => {
  const options = selected => Array.from({ length: 200 }, (_, i) => `<option value="${i}" ${i === selected ? "selected" : ""}>Item ${i}</option>`).join("")
  const rendered = tamSelect => tamSelect.results.querySelector(`[data-tam-select-entry="${tamSelect.activeIndex}"]`)

  let cleanup = setupDOM(`<select><option value="">Select</option>${options(-1)}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true })
    tamSelect.open()
    keydown(tamSelect.input, "End")
    assert.equal(activeValue(tamSelect), "199")
    assert.ok(rendered(tamSelect))
    assert.equal(tamSelect.input.getAttribute("aria-activedescendant"), tamSelect.visibleItems[tamSelect.activeIndex].id)
  } finally {
    cleanup()
  }

  cleanup = setupDOM(`<select><option value="">Select</option>${options(150)}</select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { virtualScroll: true })
    tamSelect.open()
    assert.equal(activeValue(tamSelect), "150")
    assert.ok(rendered(tamSelect))
  } finally {
    cleanup()
  }
})

// ─── Tags ────────────────────────────────────────────────────────────

test("tag drag highlighting applies multi-class strings without throwing", async () => {
  const cleanup = setupDOM(`<select multiple><option value="a" selected>A</option><option value="b" selected>B</option></select>`)
  const errors = []
  const onError = event => errors.push(event.message)
  window.addEventListener("error", onError)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { draggable: true })
    const [first, second] = tamSelect.values.querySelectorAll("[data-tag-value]")
    first.dispatchEvent(dragEvent("dragstart"))
    second.dispatchEvent(dragEvent("dragenter"))
    assert.ok(second.classList.contains("border-l-blue-500"))
    await flush(30)
    assert.ok(first.classList.contains("ring-blue-400"))
    first.dispatchEvent(dragEvent("dragend"))
    assert.equal(first.classList.contains("ring-blue-400"), false)
    assert.deepEqual(errors, [])
  } finally {
    window.removeEventListener("error", onError)
    cleanup()
  }
})

test("tag drops reorder values with special characters and stay within their optgroup", () => {
  let cleanup = setupDOM(`<select multiple><option value='a"x' selected>A</option><option value="b" selected>B</option></select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { draggable: true })
    tamSelect.draggedItem = tamSelect.items[0]
    tamSelect.onTagDrop({ preventDefault() {} }, tamSelect.items[1])
    assert.deepEqual(tamSelect.value, ["b", 'a"x'])
  } finally {
    cleanup()
  }

  cleanup = setupDOM(`<select multiple><optgroup label="G1"><option value="a" selected>A</option></optgroup><optgroup label="G2"><option value="b" selected>B</option></optgroup></select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { draggable: true })
    tamSelect.draggedItem = tamSelect.items[0]
    tamSelect.onTagDrop({ preventDefault() {} }, tamSelect.items[1])
    assert.equal(tamSelect.items.find(item => item.value === "a").group, "G1")
  } finally {
    cleanup()
  }
})

// ─── Remote data ─────────────────────────────────────────────────────

test("the Load more row is a button that loads the next page", async () => {
  const cleanup = setupDOM(regions())
  try {
    const pages = []
    globalThis.fetch = async url => {
      const page = Number(new URL(url, "http://localhost").searchParams.get("page"))
      pages.push(page)
      return jsonResponse({ items: [{ value: `p${page}`, label: `Page ${page}` }], pagination: { next_page: page < 2 ? page + 1 : null } })
    }
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 0, animations: false })
    tamSelect.open()
    await flush()
    tamSelect.results.querySelector("button[data-tam-select-load-more]").click()
    await flush()
    assert.deepEqual(pages, [1, 2])
    assert.ok(tamSelect.results.querySelector('[data-value="p2"]'))
  } finally {
    cleanup()
  }
})

test("a remote multi-select keeps loaded pages when picking with no query", async () => {
  const cleanup = setupDOM(regions().replace("<select>", "<select multiple>"))
  try {
    const pages = []
    globalThis.fetch = async url => {
      const page = Number(new URL(url, "http://localhost").searchParams.get("page"))
      pages.push(page)
      return jsonResponse({ items: [{ value: `p${page}a`, label: `P${page}A` }, { value: `p${page}b`, label: `P${page}B` }], pagination: { next_page: page < 3 ? page + 1 : null } })
    }
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 0, animations: false })
    tamSelect.open()
    await flush()
    await tamSelect.loadRemote(2, true)
    tamSelect.dropdown.querySelector('[data-value="p2a"]').click()
    await flush()
    assert.deepEqual(pages, [1, 2])
    assert.equal(tamSelect.page, 2)
  } finally {
    cleanup()
  }
})

// ─── Lifecycle ───────────────────────────────────────────────────────

test("destroy is idempotent and never tears down a newer instance", () => {
  const cleanup = setupDOM(regions())
  try {
    const select = document.querySelector("select")
    const first = new TamSelect(select)
    first.destroy()
    const second = new TamSelect(select)
    first.destroy()
    assert.equal(TamSelect.getInstance(select), second)
    assert.ok(select.classList.contains("sr-only"))
  } finally {
    cleanup()
  }
})

test("a select restored from a page snapshot is enhanced once and restores its native state", () => {
  const cleanup = setupDOM(`<div id="page">${regions()}</div>`)
  try {
    const page = document.getElementById("page")
    new TamSelect(page.querySelector("select"))
    const snapshot = page.cloneNode(true)
    page.replaceWith(snapshot)
    const restored = snapshot.querySelector("select")
    const tamSelect = new TamSelect(restored)
    assert.equal(snapshot.querySelectorAll("[data-tam-select-root]").length, 1)
    tamSelect.destroy()
    assert.equal(snapshot.querySelectorAll("[data-tam-select-root]").length, 0)
    assert.equal(restored.classList.contains("sr-only"), false)
    assert.equal(restored.hasAttribute("aria-hidden"), false)
    assert.equal(restored.hasAttribute("tabindex"), false)
  } finally {
    cleanup()
  }
})

test("the Stimulus controller restores the native select before Turbo caches the page", async () => {
  const cleanup = setupDOM(`<select data-controller="tam-select"><option value="aa">Addis</option></select>`)
  const application = Application.start()
  application.register("tam-select", TamSelectController)
  try {
    await flush()
    const select = document.querySelector("select")
    assert.ok(TamSelect.getInstance(select))
    document.dispatchEvent(new Event("turbo:before-cache"))
    assert.equal(TamSelect.getInstance(select), null)
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 0)
    assert.equal(select.classList.contains("sr-only"), false)
  } finally {
    application.stop()
    cleanup()
  }
})

test("a failed later page keeps loaded options and waits for Load more to retry", async () => {
  const cleanup = setupDOM(regions())
  try {
    const pages = []
    globalThis.fetch = async url => {
      const page = Number(new URL(url, "http://localhost").searchParams.get("page"))
      pages.push(page)
      if (page === 2) return jsonResponse({}, { ok: false, status: 500 })
      return jsonResponse({ items: [{ value: `p${page}`, label: `Page ${page}` }], pagination: { next_page: page + 1 } })
    }
    const tamSelect = new TamSelect(document.querySelector("select"), { remoteUrl: "/regions", debounce: 0, animations: false })
    // A short first page that cannot scroll asks for the next page on its own.
    Object.defineProperty(tamSelect.results, "clientHeight", { configurable: true, value: 200 })
    Object.defineProperty(tamSelect.results, "scrollHeight", { configurable: true, value: 40 })
    tamSelect.open()
    for (let index = 0; index < 10; index += 1) await flush()

    assert.deepEqual(pages, [1, 2], "the failing page is requested once, not in a loop")
    assert.ok(tamSelect.results.querySelector('[data-value="p1"]'), "loaded options stay listed")
    assert.ok(tamSelect.results.querySelector('[role="alert"]'), "the error is shown")

    tamSelect.results.dispatchEvent(new Event("scroll"))
    await flush()
    assert.deepEqual(pages, [1, 2], "scrolling does not retry")

    tamSelect.results.querySelector("button[data-tam-select-load-more]").click()
    await flush()
    assert.deepEqual(pages, [1, 2, 2], "Load more retries the failed page")
  } finally {
    cleanup()
  }
})

test("selectValue accepts a copied or stale item object by its value", () => {
  const cleanup = setupDOM(regions())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    const copy = { ...tamSelect.items.find(item => item.value === "or") }
    tamSelect.selectValue(copy)
    assert.equal(select.value, "or")
    assert.equal([...select.options].some(option => option.value === "[object Object]"), false)

    tamSelect.selectValue({ value: "zz", label: "Zanzibar" })
    assert.equal(select.value, "zz")
    assert.equal(select.selectedOptions[0].textContent, "Zanzibar")

    tamSelect.selectValue({ label: "No value" })
    assert.equal(select.value, "zz", "an object without a value is ignored")
  } finally {
    cleanup()
  }
})

test("a dir=auto ancestor does not hide the document's RTL direction", () => {
  const cleanup = setupDOM(`<div dir="auto">${regions()}</div>`)
  try {
    document.documentElement.setAttribute("dir", "rtl")
    const tamSelect = new TamSelect(document.querySelector("select"))
    assert.equal(tamSelect.dir, "rtl")
  } finally {
    cleanup()
  }
})

test("snapshot recovery removes a stale portaled dropdown", () => {
  const cleanup = setupDOM(`<div id="page"><select id="role"><option value="a">A</option></select></div><div id="portal"></div>`)
  try {
    const select = document.getElementById("role")
    new TamSelect(select, { dropdownParent: "#portal" })
    // Simulate a restored snapshot: the old markup is present, the instance is gone.
    const page = document.getElementById("page")
    const portal = document.getElementById("portal")
    const snapshotPage = page.cloneNode(true)
    const snapshotPortal = portal.cloneNode(true)
    page.replaceWith(snapshotPage)
    portal.replaceWith(snapshotPortal)

    new TamSelect(snapshotPage.querySelector("select"), { dropdownParent: "#portal" })
    assert.equal(document.querySelectorAll("#role-dropdown").length, 1)
    assert.equal(document.querySelectorAll("#role-listbox").length, 1)
  } finally {
    cleanup()
  }
})

test("the Stimulus controller rebuilds controls a cached frame navigation left on the page", async () => {
  const cleanup = setupDOM(`<select data-controller="tam-select"><option value="aa">Addis</option></select>`)
  const application = Application.start()
  application.register("tam-select", TamSelectController)
  try {
    await flush()
    const select = document.querySelector("select")
    document.dispatchEvent(new Event("turbo:before-cache"))
    assert.equal(TamSelect.getInstance(select), null)
    document.dispatchEvent(new Event("turbo:load"))
    assert.ok(TamSelect.getInstance(select), "the control is rebuilt while it stays on the page")
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 1)
    document.dispatchEvent(new Event("turbo:load"))
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 1, "later loads do not duplicate it")
  } finally {
    application.stop()
    cleanup()
  }
})

test("an auto-width menu keeps its width while the search filters it", () => {
  const cleanup = setupDOM(`<select>
    <option value="">Pick</option>
    <option value="a">Apple</option>
    <option value="long">A much longer option label that sets the menu width</option>
  </select>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    tamSelect.control.getBoundingClientRect = () => ({ left: 0, top: 0, right: 80, bottom: 44, width: 80, height: 44 })
    tamSelect.open()
    const width = tamSelect.dropdown.style.width
    assert.ok(parseFloat(width) > 80)
    input(tamSelect.input, "Apple")
    assert.equal(tamSelect.dropdown.style.width, width, "filtering out the widest option does not shrink the menu")
    tamSelect.close()
    tamSelect.open()
    assert.equal(tamSelect.dropdown.style.width, width)
  } finally {
    cleanup()
  }
})

test("inline auto-width menus stay inside an overflow-clipping ancestor", () => {
  const cleanup = setupDOM(`<div id="card" style="overflow: hidden">${regions().replace("Oromia", "An option label noticeably wider than its narrow control")}</div>`)
  try {
    const card = document.getElementById("card")
    card.getBoundingClientRect = () => ({ left: 20, top: 0, right: 220, bottom: 300, width: 200, height: 300 })
    Object.defineProperty(card, "clientWidth", { configurable: true, value: 200 })
    const tamSelect = new TamSelect(card.querySelector("select"), { classes: { wrapper: "tam-select" } })
    const rect = { left: 30, top: 0, right: 110, bottom: 44, width: 80, height: 44 }
    tamSelect.control.getBoundingClientRect = () => rect
    tamSelect.wrapper.getBoundingClientRect = () => rect
    tamSelect.open()

    const width = parseFloat(tamSelect.dropdown.style.width)
    const left = 30 + parseFloat(tamSelect.dropdown.style.left)
    assert.ok(width > 80 && width <= 200, `width ${width} fits the card`)
    assert.ok(left >= 20 && left + width <= 220, "the menu is inside the card")
    assert.equal(tamSelect.wrapper.style.position, "relative", "a custom wrapper class still anchors the menu")
  } finally {
    cleanup()
  }
})
