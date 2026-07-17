import test from "node:test"
import assert from "node:assert/strict"
import { Application } from "@hotwired/stimulus"
import TamSelect from "../src/tam-select.js"
import TamSelectController from "../rails/app/javascript/controllers/tam_select_controller.js"
import { flush, setupDOM } from "./dom_helper.js"

test("Stimulus connects, disconnects, and reconnects after a Turbo-style replacement without duplicate markup", async () => {
  const cleanup = setupDOM(`
    <div id="frame">
      <select id="region" data-controller="tam-select">
        <option value="aa">Addis Ababa</option>
      </select>
    </div>
  `)
  const application = Application.start()
  application.register("tam-select", TamSelectController)

  try {
    await flush()
    const select = document.querySelector("select")
    assert.ok(TamSelect.getInstance(select))
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 1)

    document.querySelector("#frame").replaceChildren()
    await flush()
    assert.equal(TamSelect.getInstance(select), null)
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 0)

    document.querySelector("#frame").append(select)
    await flush()
    assert.ok(TamSelect.getInstance(select))
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 1)

    select.removeAttribute("data-controller")
    await flush()
    assert.equal(TamSelect.getInstance(select), null)
    assert.equal(document.querySelectorAll("[data-tam-select-root]").length, 0)
  } finally {
    application.stop()
    cleanup()
  }
})
