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

test("the generated controller imports the importmap name and also bundles with an esbuild alias", async () => {
  const controller = await readFile(new URL("../lib/generators/tam_select/templates/tam_select_controller.js", import.meta.url), "utf8")
  assert.match(controller, /import TamSelect from ["']tam_select["']/)

  const result = await build({
    stdin: {
      contents: controller,
      resolveDir: new URL("..", import.meta.url).pathname,
      sourcefile: "tam_select_controller.js"
    },
    alias: { tam_select: new URL("../src/tam-select.js", import.meta.url).pathname },
    bundle: true,
    platform: "browser",
    write: false
  })
  assert.ok(result.outputFiles[0].text.includes("TamSelect requires a <select> element"))
})
