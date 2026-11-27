import test from "node:test"
import assert from "node:assert/strict"
import TamSelect from "../src/tam-select.js"
import { keydown, setupDOM } from "./dom_helper.js"

const fruits = (multiple = false) => `
  <select ${multiple ? "multiple" : ""}>
    ${multiple ? "" : '<option value="">Pick</option>'}
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry" disabled>Cherry</option>
  </select>
`
const activeValue = tamSelect => tamSelect.visibleItems[tamSelect.activeIndex]?.item?.value

test("disable() disables at once and closes an open dropdown; enable() restores it", () => {
  const cleanup = setupDOM(fruits())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false })
    tamSelect.open()
    assert.equal(tamSelect.opened, true)

    tamSelect.disable()
    assert.equal(select.disabled, true)
    assert.equal(tamSelect.disabled, true)
    assert.equal(tamSelect.opened, false)
    assert.equal(tamSelect.focusTarget.disabled, true)
    tamSelect.open()
    assert.equal(tamSelect.opened, false)

    tamSelect.enable()
    assert.equal(select.disabled, false)
    assert.equal(tamSelect.disabled, false)
    assert.equal(tamSelect.focusTarget.disabled, false)
    tamSelect.open()
    assert.equal(tamSelect.opened, true)
  } finally {
    cleanup()
  }
})

test("toggle() opens a closed dropdown and closes an open one", () => {
  const cleanup = setupDOM(fruits())
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    tamSelect.toggle()
    assert.equal(tamSelect.opened, true)
    tamSelect.toggle()
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("selectOnTab selects the highlighted option on Tab", () => {
  const cleanup = setupDOM(fruits())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, selectOnTab: true })
    tamSelect.open()
    while (activeValue(tamSelect) !== "banana") tamSelect.moveActive(1)
    keydown(tamSelect.input, "Tab")
    assert.equal(select.value, "banana")
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("Tab leaves the selection alone without selectOnTab, and on Shift+Tab", () => {
  const cleanup = setupDOM(fruits())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false })
    tamSelect.open()
    while (activeValue(tamSelect) !== "banana") tamSelect.moveActive(1)
    keydown(tamSelect.input, "Tab")
    assert.equal(select.value, "")

    tamSelect.destroy()
    const withOption = new TamSelect(select, { animations: false, selectOnTab: true })
    withOption.open()
    while (activeValue(withOption) !== "banana") withOption.moveActive(1)
    keydown(withOption.input, "Tab", { shiftKey: true })
    assert.equal(select.value, "")
  } finally {
    cleanup()
  }
})

test("selectOnTab adds to a multi-select without removing an already selected option", () => {
  const cleanup = setupDOM(fruits(true))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, selectOnTab: true })
    tamSelect.open()
    while (activeValue(tamSelect) !== "apple") tamSelect.moveActive(1)
    keydown(tamSelect.input, "Tab")
    assert.deepEqual(tamSelect.value, ["apple"])

    tamSelect.open()
    while (activeValue(tamSelect) !== "apple") tamSelect.moveActive(1)
    keydown(tamSelect.input, "Tab")
    assert.deepEqual(tamSelect.value, ["apple"])
  } finally {
    cleanup()
  }
})

test("selectOnTab leaves focus where Tab started instead of pulling it back to the trigger", () => {
  const cleanup = setupDOM(fruits())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, selectOnTab: true })
    tamSelect.open()
    assert.equal(document.activeElement, tamSelect.input)
    while (activeValue(tamSelect) !== "banana") tamSelect.moveActive(1)
    const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true })
    tamSelect.input.dispatchEvent(event)
    assert.equal(select.value, "banana")
    assert.equal(event.defaultPrevented, false)
    // The browser moves focus on from where Tab was pressed: the search input.
    assert.equal(document.activeElement, tamSelect.input)
  } finally {
    cleanup()
  }
})

test("selectOnTab with hideSelected and selectOnClose picks only the highlighted option", () => {
  const cleanup = setupDOM(fruits(true))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, selectOnTab: true, selectOnClose: true, hideSelected: true })
    tamSelect.open()
    while (activeValue(tamSelect) !== "apple") tamSelect.moveActive(1)
    keydown(tamSelect.input, "Tab")
    assert.deepEqual(tamSelect.value, ["apple"])
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("selectOnTab with bulkActions selects and lets focus leave instead of entering the toolbar", () => {
  const cleanup = setupDOM(fruits(true))
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false, selectOnTab: true, bulkActions: true })
    tamSelect.open()
    while (activeValue(tamSelect) !== "apple") tamSelect.moveActive(1)
    const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true })
    tamSelect.input.dispatchEvent(event)
    assert.deepEqual(tamSelect.value, ["apple"])
    assert.equal(event.defaultPrevented, false)
    assert.equal(tamSelect.opened, false)
  } finally {
    cleanup()
  }
})

test("enable() and disable() do nothing after destroy()", () => {
  const cleanup = setupDOM(fruits())
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select)
    tamSelect.destroy()
    tamSelect.disable()
    assert.equal(select.disabled, false)
  } finally {
    cleanup()
  }
})
