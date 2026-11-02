import { Controller } from "@hotwired/stimulus"
import TamSelect from "tam-select"

export default class TamSelectController extends Controller<HTMLSelectElement> {
  instance: TamSelect | null
  readonly optionsValue: Record<string, unknown>
  /** Options passed to TamSelect. Override in a subclass to add app defaults. */
  readonly tamSelectOptions: import("tam-select").TamSelectOptions | Record<string, unknown>

  connect(): void
  disconnect(): void
  optionsValueChanged(): void
  refresh(): void
  open(): void
  close(): void
  focus(): void
  clear(): void
  selectAll(): void
  deselectAll(): void
  setValue(event: { params: { value: string | string[] | null } }): void
}
