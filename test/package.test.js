import test from "node:test"
import assert from "node:assert/strict"
import TamSelect, { TamSelect as NamedTamSelect } from "../src/tam-select.js"

test("exports the same class as default and named exports", () => {
  assert.equal(TamSelect, NamedTamSelect)
})

test("tracks instances with a WeakMap", () => {
  assert.ok(TamSelect.instances instanceof WeakMap)
})
