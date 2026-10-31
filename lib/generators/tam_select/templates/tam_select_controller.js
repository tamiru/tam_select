import { Controller } from "@hotwired/stimulus"
import TamSelect from "tam_select"

export default class extends Controller {
  static values = {
    options: { type: Object, default: {} }
  }

  connect() {
    this.instance = TamSelect.getInstance(this.element) || new TamSelect(this.element, this.optionsValue)
    // Turbo snapshots the page before Stimulus disconnects. Restore the native
    // select first so a cached page never holds a dead, duplicate control.
    this.beforeCache = () => this.teardown()
    // A frame navigation promoted with data-turbo-action="advance" also caches
    // a snapshot, but keeps this page. Rebuild the control once it loads.
    this.afterLoad = () => {
      if (!this.instance && this.element.isConnected) {
        this.instance = TamSelect.getInstance(this.element) || new TamSelect(this.element, this.optionsValue)
      }
    }
    document.addEventListener("turbo:before-cache", this.beforeCache)
    document.addEventListener("turbo:load", this.afterLoad)
  }

  disconnect() {
    document.removeEventListener("turbo:before-cache", this.beforeCache)
    document.removeEventListener("turbo:load", this.afterLoad)
    this.teardown()
  }

  teardown() {
    this.instance?.destroy()
    this.instance = null
  }

  optionsValueChanged() {
    if (!this.instance) return
    this.instance.destroy()
    this.instance = new TamSelect(this.element, this.optionsValue)
  }

  refresh() { this.instance?.refresh() }
  open() { this.instance?.open() }
  close() { this.instance?.close() }
  focus() { this.instance?.focus() }
  clear() { this.instance?.clear() }
  selectAll() { this.instance?.selectAll() }
  deselectAll() { this.instance?.deselectAll() }
  setValue({ params }) { this.instance?.setValue(params.value) }
}
