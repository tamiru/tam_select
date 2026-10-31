import { Controller } from "@hotwired/stimulus"
import TamSelect from "tam_select"

export default class extends Controller {
  static values = {
    options: { type: Object, default: {} }
  }

  connect() {
    this.instance = TamSelect.getInstance(this.element) || new TamSelect(this.element, this.optionsValue)
  }

  disconnect() {
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
  setValue({ params }) { this.instance?.setValue(params.value) }
}
