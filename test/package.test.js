import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { build } from "esbuild"
import TamSelect, { TamSelect as NamedTamSelect } from "../src/tam-select.js"

test("exports the same class as default and named exports", () => {
  assert.equal(TamSelect, NamedTamSelect)
})

test("tracks instances with a WeakMap", () => {
  assert.ok(TamSelect.instances instanceof WeakMap)
})

test("gem and npm versions stay synchronized", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url)))
  const rubyVersion = await readFile(new URL("../lib/tam_select/version.rb", import.meta.url), "utf8")
  assert.match(rubyVersion, new RegExp(`VERSION = ["']${packageJson.version.replaceAll(".", "\\.")}["']`))
})

test("the jsbundling controller re-exports the npm package's Stimulus controller and bundles", async () => {
  const controller = await readFile(new URL("../lib/generators/tam_select/templates/tam_select_controller.js", import.meta.url), "utf8")
  assert.match(controller, /export \{ default \} from ["']tam-select\/stimulus["']/)

  const root = new URL("..", import.meta.url).pathname
  const result = await build({
    stdin: { contents: controller, resolveDir: root, sourcefile: "tam_select_controller.js" },
    // Resolves "tam-select/stimulus" through package.json "exports", the
    // same way it resolves from an app's node_modules.
    bundle: true,
    format: "esm",
    platform: "browser",
    write: false
  })
  const output = result.outputFiles[0].text
  assert.ok(output.includes("TamSelect requires a <select> element"), "the library is bundled")
  assert.ok(output.includes("turbo:before-cache"), "the Stimulus controller is bundled")
})
