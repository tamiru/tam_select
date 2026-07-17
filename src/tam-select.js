const DEFAULT_CLASSES = {
  wrapper: "tam-select relative w-full text-zinc-900 [color-scheme:light] dark:text-zinc-100 dark:[color-scheme:dark]",
  control: "flex min-h-11 w-full cursor-text flex-wrap items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition-colors hover:border-zinc-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-black/20 dark:hover:border-zinc-600 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400/20",
  controlDisabled: "cursor-not-allowed bg-zinc-100 opacity-60 dark:bg-zinc-800 dark:text-zinc-400",
  input: "min-w-16 flex-1 border-0 bg-transparent p-0 text-left text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500",
  searchIcon: "size-4 shrink-0 text-zinc-400 dark:text-zinc-500",
  placeholder: "pointer-events-none text-zinc-400 dark:text-zinc-500",
  tag: "inline-flex max-w-full items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-800",
  tagRemove: "rounded p-0.5 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-blue-900",
  clear: "ml-auto rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:focus:ring-blue-400",
  chevron: "ml-1 size-4 shrink-0 text-zinc-400 transition-transform",
  chevronOpen: "rotate-180",
  dropdown: "absolute z-50 mt-1.5 max-h-72 w-full overflow-auto rounded-lg border border-zinc-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40 dark:ring-white/10",
  option: "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 outline-none transition-colors dark:text-zinc-200",
  optionContent: "flex min-w-0 flex-1 items-center gap-3",
  optionText: "flex min-w-0 flex-1 flex-col",
  optionLabel: "font-normal",
  optionDetail: "text-xs font-normal text-zinc-500 dark:text-zinc-400",
  optionImage: "size-9 shrink-0 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
  optionMeta: "shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  optionActive: "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white",
  optionSelected: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  optionDisabled: "cursor-not-allowed opacity-50",
  message: "px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400",
  spinner: "size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600",
  error: "px-3 py-3 text-sm text-red-600 dark:text-red-400"
}

const ICONS = {
  search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="m14.5 14.5 3 3m-1.25-8.25a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>',
  chevron: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>',
  close: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-3" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-4" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
}

const uid = () => `tam-select-${Math.random().toString(36).slice(2, 10)}`
const normalize = value => String(value ?? "").normalize("NFKD").toLocaleLowerCase()
const toggleClasses = (element, classNames, force) => {
  String(classNames).split(/\s+/).filter(Boolean).forEach(className => element.classList.toggle(className, force))
}

export class TamSelect {
  static instances = new WeakMap()

  static getInstance(element) {
    return this.instances.get(element) || null
  }

  constructor(select, options = {}) {
    if (!(select instanceof HTMLSelectElement)) throw new TypeError("TamSelect requires a <select> element")
    if (TamSelect.instances.has(select)) return TamSelect.instances.get(select)

    this.select = select
    this.options = {
      searchable: true,
      creatable: false,
      clearable: true,
      closeAfterSelect: !select.multiple,
      placeholder: select.dataset.placeholder || select.querySelector('option[value=""]')?.textContent || "Select…",
      searchPlaceholder: "Search…",
      noResultsText: "No results found",
      createText: query => `Create “${query}”`,
      loadingText: "Loading…",
      loadMoreText: "Load more",
      remoteUrl: null,
      queryParam: "q",
      pageParam: "page",
      debounce: 250,
      minQueryLength: 0,
      valueField: "value",
      labelField: "label",
      imageField: "image",
      itemsPath: "items",
      paginationPath: "pagination",
      classes: {},
      headers: {},
      ...options
    }
    this.classes = { ...DEFAULT_CLASSES, ...this.options.classes }
    this.multiple = select.multiple
    this.items = []
    this.filtered = []
    this.activeIndex = -1
    this.opened = false
    this.loading = false
    this.error = null
    this.query = ""
    this.page = 1
    this.hasMore = false
    this.abortController = null
    this.originalTabIndex = select.getAttribute("tabindex")
    this.build()
    this.bind()
    this.readNativeOptions()
    this.renderSelection()
    TamSelect.instances.set(select, this)
  }

  build() {
    this.id = this.select.id || uid()
    if (!this.select.id) this.select.id = this.id
    this.listboxId = `${this.id}-listbox`
    this.select.classList.add("sr-only")
    this.select.tabIndex = -1

    this.wrapper = document.createElement("div")
    this.wrapper.className = this.classes.wrapper
    this.wrapper.dataset.tamSelectRoot = ""
    this.control = document.createElement("div")
    this.control.className = this.classes.control
    this.control.setAttribute("role", "combobox")
    this.control.setAttribute("aria-haspopup", "listbox")
    this.control.setAttribute("aria-expanded", "false")
    this.control.setAttribute("aria-controls", this.listboxId)
    this.control.tabIndex = this.select.disabled ? -1 : 0

    this.values = document.createElement("div")
    this.values.className = "contents"
    this.searchIcon = document.createElement("span")
    this.searchIcon.className = this.classes.searchIcon
    this.searchIcon.innerHTML = ICONS.search
    this.input = document.createElement("input")
    this.input.type = "text"
    this.input.className = this.classes.input
    this.input.placeholder = this.options.searchable ? this.options.searchPlaceholder : ""
    this.input.autocomplete = "off"
    this.input.spellcheck = false
    this.input.setAttribute("aria-autocomplete", "list")
    this.input.setAttribute("aria-controls", this.listboxId)
    if (!this.options.searchable) this.input.readOnly = true

    this.clearButton = document.createElement("button")
    this.clearButton.type = "button"
    this.clearButton.className = this.classes.clear
    this.clearButton.setAttribute("aria-label", "Clear selection")
    this.clearButton.innerHTML = ICONS.close

    this.chevron = document.createElement("span")
    this.chevron.className = this.classes.chevron
    this.chevron.innerHTML = ICONS.chevron
    this.dropdown = document.createElement("div")
    this.dropdown.id = this.listboxId
    this.dropdown.className = `${this.classes.dropdown} hidden`
    this.dropdown.setAttribute("role", "listbox")
    if (this.multiple) this.dropdown.setAttribute("aria-multiselectable", "true")

    this.control.append(this.values, this.searchIcon, this.input, this.clearButton, this.chevron)
    this.wrapper.append(this.control, this.dropdown)
    this.select.after(this.wrapper)
    this.applyDisabled()
  }

  bind() {
    this.onControlClick = event => {
      if (this.select.disabled || event.target.closest("button")) return
      this.open()
      this.input.focus()
    }
    this.onInput = () => {
      this.query = this.input.value
      this.page = 1
      this.open()
      if (this.options.remoteUrl) this.scheduleRemote()
      else this.filterLocal()
    }
    this.onKeydown = event => this.handleKeydown(event)
    this.onClear = event => { event.stopPropagation(); this.clear() }
    this.onOutside = event => { if (!this.wrapper.contains(event.target)) this.close() }
    this.onNativeChange = () => { this.readNativeOptions(); this.renderSelection(); this.renderDropdown() }
    this.onScroll = () => {
      if (!this.options.remoteUrl || !this.hasMore || this.loading) return
      if (this.dropdown.scrollTop + this.dropdown.clientHeight >= this.dropdown.scrollHeight - 32) this.loadRemote(this.page + 1, true)
    }
    this.control.addEventListener("click", this.onControlClick)
    this.input.addEventListener("input", this.onInput)
    this.control.addEventListener("keydown", this.onKeydown)
    this.clearButton.addEventListener("click", this.onClear)
    this.dropdown.addEventListener("scroll", this.onScroll)
    this.select.addEventListener("change", this.onNativeChange)
    document.addEventListener("pointerdown", this.onOutside)
  }

  readNativeOptions() {
    this.items = Array.from(this.select.options)
      .filter(option => option.value !== "" || option.selected)
      .map(option => ({
        value: option.value,
        label: option.textContent.trim(),
        detail: option.dataset.detail || null,
        meta: option.dataset.meta || null,
        image: option.dataset.image || null,
        disabled: option.disabled,
        selected: option.selected,
        option
      }))
    this.filterLocal(false)
  }

  selectedItems() { return this.items.filter(item => item.option?.selected || item.selected) }

  filterLocal(render = true) {
    const needle = normalize(this.query)
    this.filtered = this.items.filter(item => !needle || [item.label, item.detail, item.meta].some(value => normalize(value).includes(needle)))
    this.activeIndex = this.filtered.findIndex(item => !item.disabled)
    if (render) this.renderDropdown()
  }

  renderSelection() {
    const selected = this.selectedItems()
    this.values.replaceChildren()
    if (this.multiple) selected.forEach(item => this.values.append(this.makeTag(item)))
    else if (selected.length) {
      this.values.append(this.makeItemContent(selected[0], true))
    }
    const hasValue = selected.length > 0
    this.searchIcon.classList.toggle("hidden", !this.options.searchable || (hasValue && !this.opened))
    this.input.classList.toggle("hidden", !this.multiple && hasValue && !this.opened)
    this.input.placeholder = hasValue ? "" : this.options.placeholder
    this.clearButton.classList.toggle("hidden", !this.options.clearable || !hasValue || this.select.disabled)
  }

  makeTag(item) {
    const tag = document.createElement("span")
    tag.className = this.classes.tag
    const label = document.createElement("span")
    label.className = "max-w-48 truncate"
    label.textContent = item.label
    const remove = document.createElement("button")
    remove.type = "button"
    remove.className = this.classes.tagRemove
    remove.setAttribute("aria-label", `Remove ${item.label}`)
    remove.innerHTML = ICONS.close
    remove.addEventListener("click", event => { event.stopPropagation(); this.deselect(item.value) })
    tag.append(label, remove)
    return tag
  }

  renderDropdown() {
    if (!this.opened) return
    this.dropdown.replaceChildren()
    if (this.error) {
      const error = document.createElement("div")
      error.className = this.classes.error
      error.setAttribute("role", "alert")
      error.textContent = this.error
      this.dropdown.append(error)
      return
    }
    if (this.loading && this.page === 1) return this.renderMessage(this.options.loadingText, true)

    const visible = this.multiple ? this.filtered : this.filtered.filter(item => !item.selected)
    visible.forEach((item, index) => this.dropdown.append(this.makeOption(item, index)))
    if (this.options.creatable && this.query.trim() && !this.items.some(item => normalize(item.label) === normalize(this.query))) {
      this.dropdown.append(this.makeCreateOption())
    }
    if (!this.dropdown.children.length) this.renderMessage(this.options.noResultsText)
    if (this.loading && this.page > 1) this.renderMessage(this.options.loadingText, true)
    else if (this.hasMore) this.renderMessage(this.options.loadMoreText)
  }

  makeOption(item, index) {
    const option = document.createElement("div")
    option.id = `${this.listboxId}-option-${index}`
    option.dataset.value = item.value
    option.className = [this.classes.option, index === this.activeIndex && this.classes.optionActive, item.selected && this.classes.optionSelected, item.disabled && this.classes.optionDisabled].filter(Boolean).join(" ")
    option.setAttribute("role", "option")
    option.setAttribute("aria-selected", String(Boolean(item.selected)))
    option.setAttribute("aria-disabled", String(Boolean(item.disabled)))
    const content = this.makeItemContent(item)
    option.append(content)
    if (item.meta) {
      const meta = document.createElement("span")
      meta.className = this.classes.optionMeta
      meta.textContent = item.meta
      option.append(meta)
    }
    if (item.selected) {
      const check = document.createElement("span")
      check.innerHTML = ICONS.check
      option.append(check)
    }
    option.addEventListener("pointermove", () => { this.activeIndex = index; this.updateActiveOption() })
    option.addEventListener("click", () => { if (!item.disabled) this.toggleItem(item) })
    return option
  }

  makeItemContent(item, selected = false) {
    const content = document.createElement("span")
    content.className = this.classes.optionContent
    if (selected) content.classList.add("min-w-0", "flex-1")
    if (item.image) {
      const image = document.createElement("img")
      image.className = this.classes.optionImage
      image.src = item.image
      image.alt = ""
      image.loading = "lazy"
      content.append(image)
    }
    const text = document.createElement("span")
    text.className = this.classes.optionText
    const label = document.createElement("span")
    label.className = `${this.classes.optionLabel} truncate`
    label.textContent = item.label
    text.append(label)
    if (item.detail) {
      const detail = document.createElement("span")
      detail.className = `${this.classes.optionDetail} truncate`
      detail.textContent = item.detail
      text.append(detail)
    }
    content.append(text)
    return content
  }

  makeCreateOption() {
    const option = document.createElement("div")
    option.className = this.classes.option
    option.setAttribute("role", "option")
    option.textContent = typeof this.options.createText === "function" ? this.options.createText(this.query.trim()) : this.options.createText
    option.addEventListener("click", () => this.createItem(this.query.trim()))
    return option
  }

  renderMessage(text, spinner = false) {
    const message = document.createElement("div")
    message.className = this.classes.message
    if (spinner) {
      const row = document.createElement("span")
      row.className = "inline-flex items-center gap-2"
      const icon = document.createElement("span")
      icon.className = this.classes.spinner
      row.append(icon, document.createTextNode(text))
      message.append(row)
    } else message.textContent = text
    this.dropdown.append(message)
  }

  handleKeydown(event) {
    if (this.select.disabled) return
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault()
      this.open()
      const direction = event.key === "ArrowDown" ? 1 : -1
      this.moveActive(direction)
    } else if (event.key === "Enter") {
      if (!this.opened) return this.open()
      event.preventDefault()
      const item = this.filtered[this.activeIndex]
      if (item && !item.disabled) this.toggleItem(item)
      else if (this.options.creatable && this.query.trim()) this.createItem(this.query.trim())
    } else if (event.key === "Escape") {
      event.preventDefault(); this.close(); this.control.focus()
    } else if (event.key === "Backspace" && this.multiple && !this.input.value) {
      const last = this.selectedItems().at(-1)
      if (last) this.deselect(last.value)
    } else if (event.key === "Tab") this.close()
  }

  moveActive(direction) {
    if (!this.filtered.length) return
    let next = this.activeIndex
    for (let count = 0; count < this.filtered.length; count += 1) {
      next = (next + direction + this.filtered.length) % this.filtered.length
      if (!this.filtered[next].disabled) break
    }
    this.activeIndex = next
    this.updateActiveOption()
  }

  updateActiveOption() {
    this.dropdown.querySelectorAll('[role="option"]').forEach((option, index) => toggleClasses(option, this.classes.optionActive, index === this.activeIndex))
    const active = this.dropdown.querySelector(`#${CSS.escape(`${this.listboxId}-option-${this.activeIndex}`)}`)
    if (active) { this.input.setAttribute("aria-activedescendant", active.id); active.scrollIntoView({ block: "nearest" }) }
  }

  toggleItem(item) {
    if (this.multiple && item.selected) this.deselect(item.value)
    else this.selectValue(item.value)
  }

  selectValue(value) {
    const item = this.ensureNativeOption(value)
    if (!this.multiple) Array.from(this.select.options).forEach(option => { option.selected = false })
    item.option.selected = true
    item.selected = true
    this.commit()
    if (this.options.closeAfterSelect) this.close()
    else { this.input.value = ""; this.query = ""; this.filterLocal() }
  }

  deselect(value) {
    const item = this.items.find(entry => String(entry.value) === String(value))
    if (!item) return
    item.selected = false
    if (item.option) item.option.selected = false
    this.commit()
  }

  clear() {
    Array.from(this.select.options).forEach(option => { option.selected = false })
    this.items.forEach(item => { item.selected = false })
    this.commit()
  }

  createItem(label) {
    const value = typeof this.options.createValue === "function" ? this.options.createValue(label) : label
    const item = this.addItem({ value, label, selected: false, created: true })
    this.selectValue(item.value)
    this.emit("tam-select:create", { item })
  }

  addItem(raw) {
    const value = String(raw.value ?? raw[this.options.valueField])
    const existing = this.items.find(item => String(item.value) === value)
    if (existing) {
      const image = raw.image ?? raw[this.options.imageField]
      Object.assign(existing, raw, {
        detail: raw.detail ?? existing.detail,
        meta: raw.meta ?? existing.meta,
        image: image ?? existing.image
      })
      if (existing.option) {
        if (existing.detail != null) existing.option.dataset.detail = String(existing.detail)
        if (existing.meta != null) existing.option.dataset.meta = String(existing.meta)
        if (existing.image != null) existing.option.dataset.image = String(existing.image)
      }
      return existing
    }
    const label = String(raw.label ?? raw[this.options.labelField] ?? value)
    const option = new Option(label, value, Boolean(raw.selected), Boolean(raw.selected))
    option.dataset.tamSelectGenerated = ""
    if (raw.detail != null) option.dataset.detail = String(raw.detail)
    if (raw.meta != null) option.dataset.meta = String(raw.meta)
    const image = raw.image ?? raw[this.options.imageField]
    if (image != null) option.dataset.image = String(image)
    this.select.add(option)
    const item = { ...raw, value, label, image: image == null ? null : String(image), option, selected: option.selected, disabled: Boolean(raw.disabled) }
    option.disabled = item.disabled
    this.items.push(item)
    this.filterLocal(false)
    return item
  }

  ensureNativeOption(value) {
    return this.items.find(item => String(item.value) === String(value)) || this.addItem({ value, label: value })
  }

  commit() {
    this.renderSelection()
    this.renderDropdown()
    this.select.dispatchEvent(new Event("change", { bubbles: true }))
    this.emit("tam-select:change", { value: this.value, items: this.selectedItems() })
  }

  get value() { return this.multiple ? this.selectedItems().map(item => item.value) : this.selectedItems()[0]?.value ?? "" }

  setValue(value) {
    const values = new Set((Array.isArray(value) ? value : [value]).map(String))
    this.items.forEach(item => { item.selected = values.has(String(item.value)); if (item.option) item.option.selected = item.selected })
    this.commit()
  }

  open() {
    if (this.opened || this.select.disabled) return
    this.opened = true
    this.dropdown.classList.remove("hidden")
    this.control.setAttribute("aria-expanded", "true")
    this.chevron.classList.add(...this.classes.chevronOpen.split(" "))
    this.renderSelection()
    if (this.options.remoteUrl && !this.filtered.length) this.loadRemote(1)
    else this.renderDropdown()
    this.emit("tam-select:open")
  }

  close() {
    if (!this.opened) return
    this.opened = false
    this.dropdown.classList.add("hidden")
    this.control.setAttribute("aria-expanded", "false")
    this.input.removeAttribute("aria-activedescendant")
    this.chevron.classList.remove(...this.classes.chevronOpen.split(" "))
    this.input.value = ""
    this.query = ""
    this.filterLocal(false)
    this.renderSelection()
    this.emit("tam-select:close")
  }

  scheduleRemote() {
    clearTimeout(this.remoteTimer)
    if (this.query.length < this.options.minQueryLength) { this.filtered = []; return this.renderDropdown() }
    this.remoteTimer = setTimeout(() => this.loadRemote(1), this.options.debounce)
  }

  async loadRemote(page = 1, append = false) {
    if (!append) this.abortController?.abort()
    this.abortController = new AbortController()
    this.loading = true
    this.error = null
    this.page = page
    this.renderDropdown()
    try {
      const url = new URL(this.options.remoteUrl, window.location.origin)
      url.searchParams.set(this.options.queryParam, this.query)
      url.searchParams.set(this.options.pageParam, page)
      const response = await fetch(url, { headers: { Accept: "application/json", ...this.options.headers }, signal: this.abortController.signal })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      const data = await response.json()
      const rawItems = this.getPath(data, this.options.itemsPath) || []
      const remoteItems = rawItems.map(raw => this.addItem({ ...raw, value: String(raw[this.options.valueField]), label: String(raw[this.options.labelField]) }))
      const values = new Set(remoteItems.map(item => item.value))
      this.filtered = append ? [...this.filtered, ...remoteItems.filter(item => !this.filtered.some(old => old.value === item.value))] : this.items.filter(item => values.has(String(item.value)) || item.selected)
      const pagination = this.getPath(data, this.options.paginationPath) || {}
      this.hasMore = Boolean(pagination.next_page || pagination.has_more || (pagination.page && pagination.total_pages && pagination.page < pagination.total_pages))
      this.activeIndex = this.filtered.findIndex(item => !item.disabled)
      this.emit("tam-select:load", { items: remoteItems, pagination })
    } catch (error) {
      if (error.name !== "AbortError") { this.error = error.message || "Unable to load options"; this.emit("tam-select:error", { error }) }
    } finally {
      this.loading = false
      this.renderDropdown()
    }
  }

  getPath(object, path) { return String(path).split(".").reduce((value, key) => value?.[key], object) }

  applyDisabled() {
    toggleClasses(this.control, this.classes.controlDisabled, this.select.disabled)
    this.control.tabIndex = this.select.disabled ? -1 : 0
    this.input.disabled = this.select.disabled
  }

  refresh() { this.readNativeOptions(); this.applyDisabled(); this.renderSelection(); this.renderDropdown() }

  emit(name, detail = {}) { this.select.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { tamSelect: this, ...detail } })) }

  destroy() {
    clearTimeout(this.remoteTimer)
    this.abortController?.abort()
    document.removeEventListener("pointerdown", this.onOutside)
    this.select.removeEventListener("change", this.onNativeChange)
    this.wrapper.remove()
    this.select.classList.remove("sr-only")
    if (this.originalTabIndex === null) this.select.removeAttribute("tabindex")
    else this.select.setAttribute("tabindex", this.originalTabIndex)
    TamSelect.instances.delete(this.select)
  }
}

export default TamSelect
