import test from "node:test"
import assert from "node:assert/strict"
import TamSelect from "../src/tam-select.js"
import { flush, setupDOM } from "./dom_helper.js"

const options = `<option value="">Pick</option><option value="a">Alpha</option><option value="b" selected>Beta</option>`

test("a select inside a disabled fieldset is disabled and cannot open or change", () => {
  const cleanup = setupDOM(`<form><fieldset disabled><select>${options}</select></fieldset></form>`)
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false })
    assert.equal(tamSelect.disabled, true)
    assert.equal(tamSelect.focusTarget.getAttribute("aria-disabled"), "true")
    tamSelect.open()
    assert.equal(tamSelect.opened, false)
    tamSelect.clear()
    assert.equal(select.value, "b")
  } finally {
    cleanup()
  }
})

test("a select in a disabled fieldset's first legend stays enabled, like a native select", () => {
  const cleanup = setupDOM(`<fieldset disabled><legend><select>${options}</select></legend></fieldset>`)
  try {
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    assert.equal(tamSelect.disabled, false)
    tamSelect.open()
    assert.equal(tamSelect.opened, true)
  } finally {
    cleanup()
  }
})

test("disabling an ancestor fieldset closes the dropdown and re-enabling it restores the control", async () => {
  const cleanup = setupDOM(`<fieldset id="outer"><div><fieldset id="inner"><select>${options}</select></fieldset></div></fieldset>`)
  try {
    const outer = document.getElementById("outer")
    const tamSelect = new TamSelect(document.querySelector("select"), { animations: false })
    tamSelect.open()
    outer.disabled = true
    await flush()
    assert.equal(tamSelect.opened, false)
    assert.equal(tamSelect.focusTarget.getAttribute("aria-disabled"), "true")

    outer.disabled = false
    await flush()
    assert.equal(tamSelect.focusTarget.getAttribute("aria-disabled"), "false")
    tamSelect.open()
    assert.equal(tamSelect.opened, true)
  } finally {
    cleanup()
  }
})

test("disabling closes the dropdown even when tam-select:closing is cancelled", () => {
  const cleanup = setupDOM(`<select>${options}</select>`)
  try {
    const select = document.querySelector("select")
    const tamSelect = new TamSelect(select, { animations: false })
    let closing = 0
    select.addEventListener("tam-select:closing", event => { closing += 1; event.preventDefault() })
    tamSelect.open()
    tamSelect.close()
    assert.equal(tamSelect.opened, true, "an ordinary close can still be cancelled")

    tamSelect.disable()
    assert.equal(tamSelect.opened, false)
    assert.equal(closing, 2, "the forced close is still announced")
  } finally {
    cleanup()
  }
})
