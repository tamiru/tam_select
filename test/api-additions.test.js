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
