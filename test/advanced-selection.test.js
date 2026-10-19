import test from "node:test"
import assert from "node:assert/strict"
import TamSelect from "../src/tam-select.js"
import { flush, input, keydown, setupDOM } from "./dom_helper.js"

const markup = `<form><select multiple aria-label="People" name="people[]">
  <optgroup label="Engineering">
    <option value="a">Ada</option>
    <option value="b">Alan</option>
    <option value="c" disabled>Alex</option>
  </optgroup>
  <optgroup label="Unavailable" disabled><option value="d">Alice</option></optgroup>
  <option value="e" selected>Grace</option>
</select><button type="submit">Save</button></form>`

test("bulk selection preserves the query, honors limits and disabled groups, and commits once", () => {
  const cleanup = setupDOM(markup)
  try {
    const select = document.querySelector("select")
    const instance = new TamSelect(select, { bulkActions: true, showSelectionCount: true, maximumSelectionLength: 2 })
    let changes = 0
    let detail
    select.addEventListener("change", () => changes++)
    select.addEventListener("tam-select:bulk-change", event => { detail = event.detail })
    input(instance.input, "a")
    instance.selectAllButton.click()
    assert.deepEqual(instance.value, ["a", "e"])
    assert.equal(changes, 1)
    assert.equal(instance.query, "a")
    assert.equal(instance.selectionCount.textContent, "2 / 2 selected")
    assert.equal(instance.input.disabled, false)
    assert.equal(instance.selectAllButton.getAttribute("aria-disabled"), "true")
    assert.deepEqual(detail.items.map(item => item.value), ["a"])
    assert.deepEqual(new window.FormData(select.form).getAll("people[]"), ["a", "e"])
    instance.selectAll()
    assert.equal(changes, 1, "no-op bulk actions do not dispatch change")
  } finally { cleanup() }
})

test("bulk toolbar presents count-aware actions, icons, and shortcut guidance", () => {
  const cleanup = setupDOM(markup)
  try {
    const instance = new TamSelect(document.querySelector("select"), { bulkActions: true, showSelectionCount: true })

    assert.equal(instance.selectAllButton.textContent, "Select all 3")
    assert.equal(instance.deselectAllButton.textContent, "Clear 1")
    assert.ok(instance.selectAllButton.querySelector("svg"))
    assert.ok(instance.deselectAllButton.querySelector("svg"))
    assert.match(instance.selectionShortcut.textContent, /A$/)
    assert.equal(instance.selectAllButton.disabled, false)
    assert.equal(instance.deselectAllButton.disabled, false)

    instance.selectAllButton.click()

    assert.equal(instance.selectAllButton.disabled, true)
    assert.equal(instance.deselectAllButton.textContent, "Clear 3")
    assert.equal(instance.selectionCount.textContent, "3 selected")
  } finally { cleanup() }
})

test("filtered bulk actions respect per-item cancellation and preserve selections outside the filter", () => {
  const cleanup = setupDOM(markup)
  try {
    const select = document.querySelector("select")
    const instance = new TamSelect(select, { bulkActions: true, fuzzySearch: false })
    select.addEventListener("tam-select:selecting", event => {
      if (event.detail.item.value === "a") event.preventDefault()
    })
    input(instance.input, "al")
    instance.selectAll()
    assert.deepEqual(instance.value, ["b", "e"], "disabled options and groups are skipped")
    const cancel = event => event.preventDefault()
    select.addEventListener("tam-select:unselecting", cancel)
    instance.deselectAll()
    assert.deepEqual(instance.value, ["b", "e"])
    select.removeEventListener("tam-select:unselecting", cancel)
    instance.deselectAllButton.click()
    assert.deepEqual(instance.value, ["e"], "Grace remains outside the al filter")
    select.disabled = true
    instance.selectAll()
    instance.deselectAll()
    assert.deepEqual(instance.value, ["e"])
  } finally { cleanup() }
})

test("hidden selected matches remain clearable, with empty group headers removed", () => {
  const cleanup = setupDOM(markup)
  try {
    const select = document.querySelector("select")
    select.querySelector('option[value="c"]').remove()
    const instance = new TamSelect(select, { bulkActions: true, hideSelected: true, fuzzySearch: false })
    input(instance.input, "ada")
    instance.selectAll()
    assert.deepEqual(instance.visibleItems, [])
    assert.equal(instance.deselectAllButton.getAttribute("aria-disabled"), "false")
    instance.deselectAll()
    assert.deepEqual(instance.visibleItems.map(entry => entry.type), ["group-header", "item"])
    assert.deepEqual(instance.value, ["e"])
    keydown(instance.input, "a", { ctrlKey: true })
    assert.deepEqual(instance.value, ["a", "e"])
    keydown(instance.input, "a", { ctrlKey: true })
    assert.deepEqual(instance.value, ["e"])
  } finally { cleanup() }
})

test("toolbar supports keyboard entry, return, Escape, localization and native reset", async () => {
  const cleanup = setupDOM(markup)
  try {
    const select = document.querySelector("select")
    const instance = new TamSelect(select, {
      bulkActions: true, showSelectionCount: true, dropdownParent: document.body,
      language: { selectAll: "Choose matches", selectionCount: count => `${count} people` }
    })
    instance.open()
    assert.equal(instance.selectAllButton.textContent, "Choose matches")
    keydown(instance.input, "Tab")
    assert.equal(document.activeElement, instance.selectAllButton)
    keydown(instance.selectAllButton, "Tab", { shiftKey: true })
    assert.equal(document.activeElement, instance.input)
    instance.selectAllButton.focus()
    keydown(instance.selectAllButton, "Escape")
    assert.equal(instance.opened, false)
    assert.equal(document.activeElement, instance.input)
    instance.selectAll()
    assert.equal(instance.selectionCount.textContent, "3 people")
    select.form.reset()
    await flush()
    assert.equal(instance.selectionCount.textContent, "1 people")
    instance.destroy()
    assert.equal(document.querySelector("[data-tam-select-toolbar]"), null)
  } finally { cleanup() }
})

test("bulk actions apply only to loaded remote matches and never fetch all pages", async () => {
  const cleanup = setupDOM(markup)
  try {
    let requests = 0
    const instance = new TamSelect(document.querySelector("select"), {
      bulkActions: true, hideSelected: true, remoteUrl: "/people",
      transport: async () => {
        requests++
        return { items: [{ value: "remote", label: "Remote person" }], pagination: { has_more: true } }
      }
    })
    instance.open()
    instance.selectAll()
    assert.deepEqual(instance.value, ["e"], "actions do nothing while loading")
    await flush()
    instance.selectAll()
    assert.deepEqual(instance.value, ["e", "remote"])
    instance.deselectAll()
    assert.deepEqual(instance.value, ["e"])
    assert.equal(requests, 1)
    assert.equal(instance.hasMore, true)
  } finally { cleanup() }
})

test("composition does not create tags or consume Enter and filters after commit", async () => {
  const cleanup = setupDOM(markup)
  try {
    const instance = new TamSelect(document.querySelector("select"), { creatable: true, tokenSeparators: [","] })
    instance.open()
    instance.input.dispatchEvent(new window.CompositionEvent("compositionstart", { bubbles: true }))
    input(instance.input, "new,")
    const enter = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
    instance.input.dispatchEvent(enter)
    assert.equal(enter.defaultPrevented, false)
    assert.deepEqual(instance.value, ["e"])
    assert.equal(instance.query, "")
    instance.input.value = "Ada"
    instance.input.dispatchEvent(new window.CompositionEvent("compositionend", { bubbles: true }))
    await flush()
    assert.equal(instance.query, "Ada")
    assert.deepEqual(instance.visibleItems.filter(entry => entry.type === "item").map(entry => entry.item.value), ["a"])
    const safariEnter = new KeyboardEvent("keydown", { key: "Enter", keyCode: 229, bubbles: true, cancelable: true })
    instance.input.dispatchEvent(safariEnter)
    assert.equal(safariEnter.defaultPrevented, false)
    assert.deepEqual(instance.value, ["e"])
  } finally { cleanup() }
})

test("single selects keep their existing UI even when multi-select features are enabled", () => {
  const cleanup = setupDOM('<select><option value="a">Ada</option><option value="b">Alan</option></select>')
  try {
    const instance = new TamSelect(document.querySelector("select"), { bulkActions: true, showSelectionCount: true, hideSelected: true })
    assert.equal(instance.selectionToolbar, undefined)
    instance.open()
    assert.deepEqual(
      instance.visibleItems.map(entry => entry.item.value),
      ["b"],
      "single selects keep the existing behavior of hiding only their current value"
    )
    instance.setValue("b")
    assert.deepEqual(instance.visibleItems.map(entry => entry.item.value), ["a"])
    instance.selectAll()
    instance.deselectAll()
    assert.equal(instance.value, "b")
  } finally { cleanup() }
})

test("search stays usable at the limit without creating unselectable options", () => {
  const cleanup = setupDOM('<select multiple><option value="a" selected>Ada</option><option value="b">Alan</option></select>')
  try {
    const select = document.querySelector("select")
    const instance = new TamSelect(select, { creatable: true, maximumSelectionLength: 1 })
    input(instance.input, "New person")

    assert.equal(instance.input.disabled, false)
    assert.equal(instance.query, "New person")
    assert.equal(instance.visibleItems.some(entry => entry.type === "create"), false)
    assert.equal(instance.createItem("New person"), null)
    assert.equal(select.querySelector('option[value="New person"]'), null)
    assert.match(instance.status.textContent, /up to 1 item/)
  } finally { cleanup() }
})

test("bulk selection includes virtual rows outside the rendered viewport", () => {
  const cleanup = setupDOM(`<select multiple>${Array.from({ length: 150 }, (_, i) => `<option value="${i}">Person ${i}</option>`).join("")}</select>`)
  try {
    const instance = new TamSelect(document.querySelector("select"), { bulkActions: true, virtualScroll: true })
    instance.open()
    assert.ok(instance.results.querySelectorAll('[role="option"]').length < 150)
    instance.selectAllButton.click()
    assert.equal(instance.value.length, 150)
    instance.deselectAllButton.click()
    assert.deepEqual(instance.value, [])
  } finally { cleanup() }
})

test("remote search waits for composition and sends the completed query only once", async () => {
  const cleanup = setupDOM(markup)
  try {
    const queries = []
    const instance = new TamSelect(document.querySelector("select"), {
      remoteUrl: "/people", debounce: 0, minQueryLength: 1,
      transport: async ({ query }) => {
        queries.push(query)
        return { items: [] }
      }
    })
    instance.input.dispatchEvent(new window.CompositionEvent("compositionstart"))
    input(instance.input, "東")
    await flush()
    assert.deepEqual(queries, [])
    instance.input.value = "東京"
    instance.input.dispatchEvent(new window.CompositionEvent("compositionend"))
    instance.input.dispatchEvent(new Event("input", { bubbles: true }))
    await flush()
    assert.deepEqual(queries, ["東京"])
  } finally { cleanup() }
})
