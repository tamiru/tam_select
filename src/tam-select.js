const DEFAULT_CLASSES = {
  wrapper: "tam-select relative w-full text-zinc-900 [color-scheme:light] dark:text-zinc-100 dark:[color-scheme:dark]",
  control: "relative flex min-h-11 w-full cursor-text flex-wrap items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition duration-150 hover:border-zinc-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-black/20 dark:hover:border-zinc-600 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400/10",
  controlMultiple: "",
  controlOpen: "border-blue-500 ring-4 ring-blue-500/10 dark:border-blue-400 dark:ring-blue-400/10",
  controlInvalid: "border-red-500 ring-4 ring-red-500/10 dark:border-red-400 dark:ring-red-400/10",
  controlDisabled: "cursor-not-allowed bg-zinc-100 opacity-60 dark:bg-zinc-800 dark:text-zinc-400",
  input: "min-w-16 flex-1 border-0 bg-transparent p-0 text-left text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500",
  inputClosed: "absolute inset-0 z-0 h-full w-full cursor-pointer opacity-0",
  trigger: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-xl border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
  searchIcon: "size-4 shrink-0 text-zinc-400 dark:text-zinc-500",
  placeholder: "pointer-events-none text-zinc-400 dark:text-zinc-500",
  tag: "relative z-10 inline-flex max-w-full items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 transition-colors dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-800",
  tagRemove: "rounded p-0.5 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-blue-900",
  clear: "relative z-20 ml-auto rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:focus:ring-blue-400",
  chevron: "pointer-events-none relative z-10 ml-auto size-4 shrink-0 text-zinc-400 transition-transform",
  chevronOpen: "rotate-180",
  dropdown: "absolute z-50 mt-1.5 max-h-72 w-full origin-top overflow-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/50 dark:ring-white/10",
  option: "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-zinc-700 outline-none transition-colors duration-100 dark:text-zinc-200",
  optionContent: "flex min-w-0 flex-1 items-center gap-3",
  optionText: "flex min-w-0 flex-1 flex-col",
  optionLabel: "font-normal",
  optionDetail: "text-xs font-normal text-zinc-500 dark:text-zinc-400",
  optionImage: "size-9 shrink-0 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
  optionMeta: "shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  optionActive: "bg-blue-600 text-white shadow-sm [&_*]:text-white dark:bg-blue-500 dark:text-white",
  optionSelected: "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  optionDisabled: "cursor-not-allowed opacity-50",
  highlight: "rounded-sm bg-amber-200/80 px-0.5 text-inherit dark:bg-amber-400/30",
  status: "sr-only",
  message: "px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400",
  spinner: "size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600",
  error: "px-3 py-3 text-sm text-red-600 dark:text-red-400"
}

// DaisyUI's semantic color classes are used when the host application has
// DaisyUI installed.
const THEME_CLASSES = {
  daisyui: {
    wrapper: "tam-select relative w-full text-base-content",
    control: "input relative w-full cursor-text rounded-field text-base-content focus:[--input-color:var(--color-primary)] focus:outline-none focus:outline-offset-0 focus:shadow-none focus-visible:[--input-color:var(--color-primary)] focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:shadow-none focus-within:[--input-color:var(--color-primary)] focus-within:outline-none focus-within:outline-offset-0 focus-within:shadow-none",
    controlMultiple: "h-auto min-h-10 flex-wrap py-1.5",
    controlOpen: "[--input-color:var(--color-primary)] ring-2 ring-primary/15",
    controlInvalid: "input-error",
    controlDisabled: "cursor-not-allowed bg-base-200 opacity-50",
    input: "min-w-16 flex-1 bg-transparent p-0 text-left text-base-content outline-none placeholder:text-base-content/50 focus:outline-none focus:ring-0",
    inputClosed: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-field opacity-0",
    trigger: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-field border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
    searchIcon: "size-4 shrink-0 text-base-content/50",
    placeholder: "pointer-events-none text-base-content/50",
    tag: "badge badge-primary relative z-10 max-w-full gap-1",
    tagRemove: "rounded-btn p-0.5 hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary",
    clear: "relative z-20 ml-auto rounded-btn p-1 text-base-content/50 transition-colors hover:bg-base-200 hover:text-base-content focus:outline-none focus:ring-2 focus:ring-primary",
    chevron: "pointer-events-none relative z-10 ml-auto size-4 shrink-0 text-base-content/50 transition-transform",
    dropdown: "absolute z-50 mt-1.5 max-h-72 w-full origin-top overflow-auto rounded-box border border-base-300 bg-base-100 p-2 shadow-2xl ring-1 ring-base-content/10",
    option: "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-btn px-3 py-2 text-sm text-base-content outline-none transition-colors duration-100",
    optionDetail: "text-xs font-normal text-base-content/60",
    optionImage: "size-9 shrink-0 rounded-full bg-base-200 object-cover",
    optionMeta: "badge badge-ghost shrink-0",
    optionActive: "bg-primary/10 text-primary",
    optionSelected: "bg-primary/10 font-medium text-primary",
    optionDisabled: "cursor-not-allowed opacity-50",
    highlight: "rounded-sm bg-warning/30 px-0.5 text-inherit",
    message: "px-3 py-6 text-center text-sm text-base-content/60",
    spinner: "loading loading-spinner loading-sm text-primary",
    error: "px-3 py-3 text-sm text-error"
  }
}

const ICONS = {
  search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="m14.5 14.5 3 3m-1.25-8.25a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>',
  chevron: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>',
  close: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-3" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-4" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
}

const uid = () => `tam-select-${Math.random().toString(36).slice(2, 10)}`
const fold = value => String(value ?? "").normalize("NFKD").replace(/\p{Mark}/gu, "").toLocaleLowerCase()
const normalize = value => fold(value).trim()
const wordTokens = value => normalize(value).split(/[^\p{Letter}\p{Number}]+/u).filter(Boolean)
const boundedDistance = (left, right, maximum) => {
  if (Math.abs(left.length - right.length) > maximum) return maximum + 1
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex]
    let rowMinimum = current[0]
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitution = previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
      const distance = Math.min(previous[rightIndex] + 1, current[rightIndex - 1] + 1, substitution)
      current.push(distance)
      rowMinimum = Math.min(rowMinimum, distance)
    }
    if (rowMinimum > maximum) return maximum + 1
    previous = current
  }
  return previous[right.length]
}
const toggleClasses = (element, classNames, force) => {
  String(classNames).split(/\s+/).filter(Boolean).forEach(className => element.classList.toggle(className, force))
}
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key)

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
      inputTooShortText: remaining => `Enter ${remaining} more character${remaining === 1 ? "" : "s"}`,
      remoteUrl: null,
      queryParam: "q",
      pageParam: "page",
      debounce: 250,
      minQueryLength: 0,
      fuzzySearch: true,
      highlightMatches: true,
      sortByRelevance: true,
      searchFields: ["label", "detail", "meta"],
      resultsText: count => `${count} result${count === 1 ? "" : "s"} available`,
      valueField: "value",
      labelField: "label",
      imageField: "image",
      itemsPath: "items",
      paginationPath: "pagination",
      matcher: null,
      theme: "default",
      classes: {},
      headers: {},
      ...options
    }
    const inferredTheme = ["input", "select"].some(className => select.classList.contains(className)) ? "daisyui" : "default"
    this.theme = this.options.theme === "auto" ? inferredTheme : this.options.theme
    const themeClasses = THEME_CLASSES[this.theme] || {}
    this.classes = { ...DEFAULT_CLASSES, ...themeClasses, ...this.options.classes }
    this.multiple = select.multiple
    this.searchable = Boolean(this.options.searchable || this.options.creatable)
    this.items = []
    this.remoteResults = []
    this.visibleItems = []
    this.activeIndex = -1
    this.opened = false
    this.loading = false
    this.loadingPage = null
    this.error = null
    this.query = ""
    this.page = 0
    this.nextPage = null
    this.hasMore = false
    this.requestSequence = 0
    this.activeRequest = null
    this.optionIds = new WeakMap()
    this.optionIdSequence = 0
    this.invalidFromEvent = false
    this.originalTabIndex = select.getAttribute("tabindex")
    this.originalAriaHidden = select.getAttribute("aria-hidden")
    this.originalId = select.getAttribute("id")
    this.hadSrOnlyClass = select.classList.contains("sr-only")
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
    this.valuesId = `${this.id}-value`
    this.select.classList.add("sr-only")
    this.select.tabIndex = -1
    this.select.setAttribute("aria-hidden", "true")

    this.wrapper = document.createElement("div")
    this.wrapper.className = this.classes.wrapper
    this.wrapper.dataset.tamSelectRoot = ""

    this.control = document.createElement("div")
    this.control.className = [
      this.classes.control,
      this.multiple && this.classes.controlMultiple
    ].filter(Boolean).join(" ")

    this.values = document.createElement("div")
    this.values.id = this.valuesId
    this.values.className = "contents"

    this.searchIcon = document.createElement("span")
    this.searchIcon.className = this.classes.searchIcon
    this.searchIcon.innerHTML = ICONS.search

    if (this.searchable) {
      this.input = document.createElement("input")
      this.input.id = `${this.id}-search`
      this.input.type = "text"
      this.input.className = this.classes.input
      this.input.autocomplete = "off"
      this.input.spellcheck = false
      this.input.setAttribute("role", "combobox")
      this.input.setAttribute("aria-haspopup", "listbox")
      this.input.setAttribute("aria-expanded", "false")
      this.input.setAttribute("aria-controls", this.listboxId)
      this.input.setAttribute("aria-autocomplete", "list")
      this.focusTarget = this.input
    } else {
      this.trigger = document.createElement("button")
      this.trigger.type = "button"
      this.trigger.className = this.classes.trigger
      this.trigger.setAttribute("role", "combobox")
      this.trigger.setAttribute("aria-haspopup", "listbox")
      this.trigger.setAttribute("aria-expanded", "false")
      this.trigger.setAttribute("aria-controls", this.listboxId)
      this.focusTarget = this.trigger
    }

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

    this.status = document.createElement("div")
    this.status.className = this.classes.status
    this.status.setAttribute("role", "status")
    this.status.setAttribute("aria-live", "polite")
    this.status.setAttribute("aria-atomic", "true")

    const focusControl = this.searchable ? [this.searchIcon, this.input] : [this.trigger]
    this.control.append(this.values, ...focusControl, this.clearButton, this.chevron)
    this.wrapper.append(this.control, this.dropdown, this.status)
    this.select.after(this.wrapper)
    this.labelElements = this.findLabelElements()
    this.applyDisabled()
    this.syncAria()
  }

  bind() {
    this.onControlClick = event => {
      if (!this.searchable || this.select.disabled || event.target.closest("button")) return
      this.open()
      this.input.focus()
    }
    this.onInput = () => {
      this.query = this.input.value
      this.open(false)
      if (this.options.remoteUrl) this.scheduleRemote()
      else this.filterLocal()
    }
    this.onKeydown = event => this.handleKeydown(event)
    this.onClear = event => { event.stopPropagation(); this.clear() }
    this.onTrigger = event => { event.preventDefault(); this.open(); this.trigger.focus() }
    this.onOutside = event => { if (!this.wrapper.contains(event.target)) this.close() }
    this.onNativeChange = () => {
      if (this.select.checkValidity()) this.invalidFromEvent = false
      this.readNativeOptions()
      this.renderSelection()
      this.syncAria()
      this.renderDropdown()
    }
    this.onNativeInvalid = event => {
      event.preventDefault()
      this.invalidFromEvent = true
      this.syncAria()
      this.focusTarget.focus()
    }
    this.onScroll = () => {
      if (!this.options.remoteUrl || !this.hasMore || this.loading) return
      if (this.dropdown.scrollTop + this.dropdown.clientHeight >= this.dropdown.scrollHeight - 32) {
        this.loadRemote(this.nextPage || this.page + 1, true)
      }
    }
    this.onLabelClick = event => {
      if (event.target.closest("a, button, input, select, textarea")) return
      event.preventDefault()
      this.focusTarget.focus()
    }

    this.control.addEventListener("click", this.onControlClick)
    this.focusTarget.addEventListener("keydown", this.onKeydown)
    if (this.input) this.input.addEventListener("input", this.onInput)
    if (this.trigger) this.trigger.addEventListener("click", this.onTrigger)
    this.clearButton.addEventListener("click", this.onClear)
    this.dropdown.addEventListener("scroll", this.onScroll)
    this.select.addEventListener("change", this.onNativeChange)
    this.select.addEventListener("invalid", this.onNativeInvalid)
    this.labelElements.forEach(label => label.addEventListener("click", this.onLabelClick))
    document.addEventListener("pointerdown", this.onOutside)
  }

  findLabelElements() {
    const labels = Array.from(document.querySelectorAll("label")).filter(label => label.htmlFor === this.id || label.contains(this.select))
    return [...new Set(labels)]
  }

  labelledBy() {
    const nativeLabelledBy = this.select.getAttribute("aria-labelledby")
    if (nativeLabelledBy) return nativeLabelledBy
    if (!this.labelElements.length) return null
    return this.labelElements.map(label => {
      if (!label.id) label.id = uid()
      return label.id
    }).join(" ")
  }

  readNativeOptions() {
    const previousItems = new Map(this.items.map(item => [item.option, item]))
    this.items = Array.from(this.select.options)
      .filter(option => option.value !== "")
      .map(option => {
        const item = previousItems.get(option) || { option, id: this.optionId(option) }
        Object.assign(item, {
          value: option.value,
          label: option.textContent.trim(),
          detail: option.dataset.detail || null,
          meta: option.dataset.meta || null,
          image: option.dataset.image || null,
          disabled: option.disabled,
          selected: option.selected,
          option
        })
        return item
      })

    if (this.options.remoteUrl) {
      const currentOptions = new Set(this.items.map(item => item.option))
      this.remoteResults = this.remoteResults.filter(item => currentOptions.has(item.option))
      this.updateVisibleItems(this.remoteResults)
    } else {
      this.filterLocal(false)
    }
  }

  selectedItems() {
    return this.items.filter(item => item.option?.selected || item.selected)
  }

  matchesLocalItem(item) {
    if (typeof this.options.matcher === "function") return Boolean(this.options.matcher(item, this.query))
    return Number.isFinite(this.searchScore(item))
  }

  filterLocal(render = true) {
    let matches
    if (typeof this.options.matcher === "function") {
      matches = this.items.filter(item => this.matchesLocalItem(item))
    } else {
      matches = this.items
        .map((item, index) => ({ item, index, score: this.searchScore(item) }))
        .filter(match => Number.isFinite(match.score))
      if (this.options.sortByRelevance && normalize(this.query)) {
        matches.sort((left, right) => left.score - right.score || left.index - right.index)
      }
      matches = matches.map(match => match.item)
    }
    this.updateVisibleItems(matches)
    if (render) this.renderDropdown()
  }

  searchScore(item) {
    const terms = normalize(this.query).split(/\s+/).filter(Boolean)
    if (!terms.length) return 0
    const configuredFields = Array.isArray(this.options.searchFields) ? this.options.searchFields : ["label", "detail", "meta"]
    const fields = configuredFields
      .map((name, index) => ({ text: normalize(item[name]), weight: index * 0.25 }))
      .filter(field => field.text)

    let total = 0
    for (const term of terms) {
      let best = Infinity
      fields.forEach(field => {
        const tokens = wordTokens(field.text)
        let score = Infinity
        if (field.text === term) score = 0
        else if (field.text.startsWith(term)) score = 0.5
        else if (tokens.includes(term)) score = 1
        else if (tokens.some(token => token.startsWith(term))) score = 1.5
        else {
          const position = field.text.indexOf(term)
          if (position >= 0) score = 2 + position / Math.max(field.text.length, 1)
        }

        if (!Number.isFinite(score) && this.options.fuzzySearch && term.length >= 3) {
          const maximum = term.length >= 6 ? 2 : 1
          const distance = tokens.reduce((closest, token) => Math.min(closest, boundedDistance(term, token, maximum)), maximum + 1)
          if (distance <= maximum) score = 4 + distance
        }
        best = Math.min(best, score + field.weight)
      })
      if (!Number.isFinite(best)) return Infinity
      total += best
    }
    return total
  }

  updateVisibleItems(candidateItems, preserveActive = true) {
    const previousId = preserveActive ? this.visibleItems[this.activeIndex]?.id : null
    const entries = candidateItems
      .filter(item => this.multiple || !item.selected)
      .map(item => ({ type: "item", id: item.id, item, disabled: Boolean(item.disabled) }))

    const createEntry = this.createEntry()
    if (createEntry) entries.push(createEntry)

    this.visibleItems = entries
    const preservedIndex = previousId ? entries.findIndex(entry => entry.id === previousId && !entry.disabled) : -1
    this.activeIndex = preservedIndex >= 0 ? preservedIndex : entries.findIndex(entry => !entry.disabled)
  }

  createEntry() {
    const label = this.query.trim()
    if (!this.options.creatable || !label) return null
    const value = typeof this.options.createValue === "function" ? this.options.createValue(label) : label
    const normalizedValue = normalize(value)
    const normalizedLabel = normalize(label)
    const duplicate = this.items.some(item => normalize(item.value) === normalizedValue || normalize(item.label) === normalizedLabel)
    if (!normalizedValue || duplicate) return null
    return { type: "create", id: `${this.listboxId}-create`, label, value: String(value), disabled: false }
  }

  renderSelection() {
    const selected = this.selectedItems()
    this.values.replaceChildren()
    if (this.multiple) {
      selected.forEach(item => this.values.append(this.makeTag(item)))
    } else if (selected.length) {
      this.values.append(this.makeItemContent(selected[0], true))
    } else {
      const placeholder = document.createElement("span")
      placeholder.className = this.classes.placeholder
      placeholder.textContent = this.options.placeholder
      this.values.append(placeholder)
    }

    const hasValue = selected.length > 0
    this.values.classList.toggle("hidden", !this.multiple && this.opened)
    this.searchIcon.classList.toggle("hidden", !this.searchable || (!this.multiple && !this.opened))
    if (this.input) {
      toggleClasses(this.input, this.classes.inputClosed, !this.multiple && !this.opened)
      this.input.placeholder = this.multiple && !hasValue ? this.options.placeholder : this.options.searchPlaceholder
    }
    this.clearButton.classList.toggle("hidden", !this.options.clearable || !hasValue || this.select.disabled)
    this.syncAria()
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
    remove.disabled = this.select.disabled
    remove.setAttribute("aria-label", `Remove ${item.label}`)
    remove.innerHTML = ICONS.close
    remove.addEventListener("click", event => { event.stopPropagation(); this.deselect(item.value) })
    tag.append(label, remove)
    return tag
  }

  renderDropdown() {
    if (!this.opened) return
    this.dropdown.replaceChildren()
    this.dropdown.setAttribute("aria-busy", String(this.loading))

    const remaining = Math.max(0, this.options.minQueryLength - this.query.trim().length)
    if (this.options.remoteUrl && remaining > 0) {
      const text = typeof this.options.inputTooShortText === "function" ? this.options.inputTooShortText(remaining) : this.options.inputTooShortText
      this.renderMessage(text)
      this.updateStatus(text)
      return this.syncActiveDescendant()
    }
    if (this.error) {
      const error = document.createElement("div")
      error.className = this.classes.error
      error.setAttribute("role", "alert")
      error.textContent = this.error
      this.dropdown.append(error)
      this.updateStatus(this.error)
      return this.syncActiveDescendant()
    }
    if (this.loading && this.loadingPage === 1) {
      this.renderMessage(this.options.loadingText, true)
      this.updateStatus(this.options.loadingText)
      return this.syncActiveDescendant()
    }

    this.visibleItems.forEach((entry, index) => this.dropdown.append(this.makeOption(entry, index)))
    if (!this.visibleItems.length) this.renderMessage(this.options.noResultsText)
    if (this.loading && this.loadingPage > 1) this.renderMessage(this.options.loadingText, true)
    else if (this.hasMore) this.renderMessage(this.options.loadMoreText)
    const resultCount = this.visibleItems.filter(entry => entry.type === "item").length
    const statusText = resultCount || this.visibleItems.length
      ? (typeof this.options.resultsText === "function" ? this.options.resultsText(resultCount) : this.options.resultsText)
      : this.options.noResultsText
    this.updateStatus(statusText)
    this.syncActiveDescendant()
  }

  makeOption(entry, index) {
    const option = document.createElement("div")
    option.id = entry.id
    option.dataset.tamSelectEntry = String(index)
    option.className = [
      this.classes.option,
      index === this.activeIndex && this.classes.optionActive,
      index !== this.activeIndex && entry.type === "item" && entry.item.selected && this.classes.optionSelected,
      entry.disabled && this.classes.optionDisabled
    ].filter(Boolean).join(" ")
    option.setAttribute("role", "option")
    option.setAttribute("aria-selected", String(Boolean(entry.type === "item" && entry.item.selected)))
    option.setAttribute("aria-disabled", String(Boolean(entry.disabled)))

    if (entry.type === "create") {
      option.textContent = typeof this.options.createText === "function" ? this.options.createText(entry.label) : this.options.createText
    } else {
      const item = entry.item
      option.dataset.value = item.value
      option.append(this.makeItemContent(item))
      if (item.meta) {
        const meta = document.createElement("span")
        meta.className = this.classes.optionMeta
        this.renderHighlightedText(meta, item.meta)
        option.append(meta)
      }
      if (item.selected) {
        const check = document.createElement("span")
        check.innerHTML = ICONS.check
        option.append(check)
      }
    }

    option.addEventListener("pointermove", () => { if (!entry.disabled) { this.activeIndex = index; this.updateActiveOption() } })
    option.addEventListener("click", () => this.activateEntry(entry))
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
    if (selected) label.textContent = item.label
    else this.renderHighlightedText(label, item.label)
    text.append(label)
    if (item.detail) {
      const detail = document.createElement("span")
      detail.className = `${this.classes.optionDetail} truncate`
      if (selected) detail.textContent = item.detail
      else this.renderHighlightedText(detail, item.detail)
      text.append(detail)
    }
    content.append(text)
    return content
  }

  renderHighlightedText(element, value) {
    const text = String(value ?? "")
    const terms = normalize(this.query).split(/\s+/).filter(Boolean)
    if (!this.options.highlightMatches || !terms.length) {
      element.textContent = text
      return
    }

    const positions = []
    let offset = 0
    let normalizedText = ""
    for (const character of text) {
      const start = offset
      offset += character.length
      const normalizedCharacter = fold(character)
      normalizedText += normalizedCharacter
      for (let index = 0; index < normalizedCharacter.length; index += 1) positions.push({ start, end: offset })
    }

    const ranges = []
    terms.forEach(term => {
      let from = 0
      while (from < normalizedText.length) {
        const index = normalizedText.indexOf(term, from)
        if (index < 0) break
        const first = positions[index]
        const last = positions[index + term.length - 1]
        if (first && last) ranges.push([first.start, last.end])
        from = index + Math.max(term.length, 1)
      }
    })
    if (!ranges.length) {
      element.textContent = text
      return
    }

    ranges.sort((left, right) => left[0] - right[0] || left[1] - right[1])
    const merged = []
    ranges.forEach(range => {
      const previous = merged.at(-1)
      if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1])
      else merged.push([...range])
    })

    let cursor = 0
    merged.forEach(([start, end]) => {
      if (start > cursor) element.append(document.createTextNode(text.slice(cursor, start)))
      const mark = document.createElement("mark")
      mark.className = this.classes.highlight
      mark.textContent = text.slice(start, end)
      element.append(mark)
      cursor = end
    })
    if (cursor < text.length) element.append(document.createTextNode(text.slice(cursor)))
  }

  updateStatus(text) {
    this.status.textContent = String(text ?? "")
  }

  renderMessage(text, spinner = false) {
    const message = document.createElement("div")
    message.className = this.classes.message
    message.setAttribute("role", "status")
    if (spinner) {
      const row = document.createElement("span")
      row.className = "inline-flex items-center gap-2"
      const icon = document.createElement("span")
      icon.className = this.classes.spinner
      row.append(icon, document.createTextNode(text))
      message.append(row)
    } else {
      message.textContent = text
    }
    this.dropdown.append(message)
  }

  handleKeydown(event) {
    if (this.select.disabled || event.target.closest("button") && event.target !== this.trigger) return

    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault()
      const wasOpen = this.opened
      this.open()
      if (wasOpen || event.key === "ArrowUp") this.moveActive(event.key === "ArrowDown" ? 1 : -1)
      else this.updateActiveOption()
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (!this.opened) return this.open()
      this.activateEntry(this.visibleItems[this.activeIndex])
    } else if (event.key === " " && this.trigger) {
      event.preventDefault()
      this.open()
    } else if (event.key === "Escape" && this.opened) {
      event.preventDefault()
      this.close()
      this.focusTarget.focus()
    } else if (event.key === "Backspace" && this.multiple && this.input && !this.input.value) {
      const last = this.selectedItems().at(-1)
      if (last) this.deselect(last.value)
    } else if (event.key === "Tab") {
      this.close()
    } else if (this.input && !this.opened && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      this.open(false)
    }
  }

  moveActive(direction) {
    if (!this.visibleItems.length) return
    let next = this.activeIndex
    for (let count = 0; count < this.visibleItems.length; count += 1) {
      next = (next + direction + this.visibleItems.length) % this.visibleItems.length
      if (!this.visibleItems[next].disabled) {
        this.activeIndex = next
        return this.updateActiveOption()
      }
    }
  }

  updateActiveOption() {
    this.dropdown.querySelectorAll("[data-tam-select-entry]").forEach(option => {
      const index = Number(option.dataset.tamSelectEntry)
      toggleClasses(option, this.classes.optionActive, index === this.activeIndex)
    })
    this.syncActiveDescendant(true)
  }

  syncActiveDescendant(scroll = false) {
    const entry = this.visibleItems[this.activeIndex]
    const active = entry && this.dropdown.querySelector(`[data-tam-select-entry="${this.activeIndex}"]`)
    if (this.opened && active && !entry.disabled) {
      this.focusTarget.setAttribute("aria-activedescendant", entry.id)
      if (scroll) active.scrollIntoView({ block: "nearest" })
    } else {
      this.focusTarget.removeAttribute("aria-activedescendant")
    }
  }

  activateEntry(entry) {
    if (!entry || entry.disabled) return
    if (entry.type === "create") this.createItem(entry.label, entry.value)
    else this.toggleItem(entry.item)
  }

  toggleItem(item) {
    if (item.disabled) return
    if (this.multiple && item.selected) this.deselect(item.value)
    else this.selectValue(item.value)
  }

  selectValue(value) {
    const item = this.ensureNativeOption(value)
    if (item.disabled) return
    if (!this.multiple) Array.from(this.select.options).forEach(option => { option.selected = false })
    item.option.selected = true
    item.selected = true
    this.commit()
    if (this.options.closeAfterSelect) this.close()
    else this.resetQueryAfterSelection()
  }

  resetQueryAfterSelection() {
    if (this.input) this.input.value = ""
    this.query = ""
    if (this.options.remoteUrl) this.scheduleRemote()
    else this.filterLocal()
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

  createItem(label, candidateValue = undefined) {
    const value = candidateValue ?? (typeof this.options.createValue === "function" ? this.options.createValue(label) : label)
    const existing = this.items.find(item => normalize(item.value) === normalize(value) || normalize(item.label) === normalize(label))
    if (existing) {
      this.selectValue(existing.value)
      return existing
    }
    const item = this.addItem({ value, label, selected: false, created: true })
    this.selectValue(item.value)
    this.emit("tam-select:create", { item })
    return item
  }

  addItem(raw) {
    const rawValue = raw.value ?? raw[this.options.valueField]
    const value = String(rawValue ?? "")
    const existing = this.items.find(item => String(item.value) === value)
    const label = String(raw.label ?? raw[this.options.labelField] ?? value)
    const image = raw.image ?? raw[this.options.imageField]
    if (existing) {
      existing.value = value
      existing.label = label
      existing.detail = hasOwn(raw, "detail") ? raw.detail : existing.detail
      existing.meta = hasOwn(raw, "meta") ? raw.meta : existing.meta
      existing.image = image ?? existing.image
      if (hasOwn(raw, "disabled")) existing.disabled = Boolean(raw.disabled)
      this.syncNativeOption(existing)
      return existing
    }

    const option = new Option(label, value, Boolean(raw.selected), Boolean(raw.selected))
    option.dataset.tamSelectGenerated = ""
    this.select.add(option)
    const item = {
      ...raw,
      id: this.optionId(option),
      value,
      label,
      detail: raw.detail ?? null,
      meta: raw.meta ?? null,
      image: image == null ? null : String(image),
      option,
      selected: option.selected,
      disabled: Boolean(raw.disabled)
    }
    this.syncNativeOption(item)
    this.items.push(item)
    return item
  }

  upsertRemoteItem(raw) {
    const value = String(raw?.[this.options.valueField] ?? raw?.value ?? "")
    const label = String(raw?.[this.options.labelField] ?? raw?.label ?? value)
    const image = raw?.[this.options.imageField] ?? raw?.image ?? null
    const item = this.addItem({
      value,
      label,
      detail: raw?.detail ?? null,
      meta: raw?.meta ?? null,
      image,
      disabled: Boolean(raw?.disabled)
    })
    item.detail = raw?.detail ?? null
    item.meta = raw?.meta ?? null
    item.image = image == null ? null : String(image)
    item.disabled = Boolean(raw?.disabled)
    this.syncNativeOption(item)
    return item
  }

  syncNativeOption(item) {
    if (!item.option) return
    item.option.value = item.value
    item.option.textContent = item.label
    item.option.disabled = Boolean(item.disabled)
    this.setDataAttribute(item.option, "detail", item.detail)
    this.setDataAttribute(item.option, "meta", item.meta)
    this.setDataAttribute(item.option, "image", item.image)
  }

  setDataAttribute(option, name, value) {
    if (value == null || value === "") delete option.dataset[name]
    else option.dataset[name] = String(value)
  }

  optionId(option) {
    if (!this.optionIds.has(option)) {
      this.optionIdSequence += 1
      this.optionIds.set(option, `${this.listboxId}-option-${this.optionIdSequence}`)
    }
    return this.optionIds.get(option)
  }

  ensureNativeOption(value) {
    return this.items.find(item => String(item.value) === String(value)) || this.addItem({ value, label: value })
  }

  commit() {
    if (this.select.checkValidity()) this.invalidFromEvent = false
    this.readNativeOptions()
    this.renderSelection()
    this.renderDropdown()
    this.syncAria()
    this.select.dispatchEvent(new Event("change", { bubbles: true }))
    this.emit("tam-select:change", { value: this.value, items: this.selectedItems() })
  }

  get value() {
    return this.multiple ? this.selectedItems().map(item => item.value) : this.selectedItems()[0]?.value ?? ""
  }

  setValue(value) {
    const rawValues = value == null ? [] : (Array.isArray(value) ? value : [value])
    const values = new Set(rawValues.map(String))
    this.items.forEach(item => {
      item.selected = values.has(String(item.value))
      if (item.option) item.option.selected = item.selected
    })
    this.commit()
  }

  open(loadRemote = true) {
    if (this.opened || this.select.disabled) return
    this.opened = true
    this.dropdown.classList.remove("hidden")
    this.focusTarget.setAttribute("aria-expanded", "true")
    toggleClasses(this.control, this.classes.controlOpen, true)
    toggleClasses(this.chevron, this.classes.chevronOpen, true)
    this.renderSelection()
    if (this.options.remoteUrl && loadRemote) this.startRemoteSearch(false)
    else this.renderDropdown()
    this.focusTarget.focus({ preventScroll: true })
    this.emit("tam-select:open")
  }

  close() {
    if (!this.opened) return
    this.opened = false
    this.cancelRemoteWork()
    this.dropdown.classList.add("hidden")
    this.focusTarget.setAttribute("aria-expanded", "false")
    toggleClasses(this.control, this.classes.controlOpen, false)
    this.focusTarget.removeAttribute("aria-activedescendant")
    toggleClasses(this.chevron, this.classes.chevronOpen, false)
    if (this.input) this.input.value = ""
    this.query = ""
    this.loading = false
    this.loadingPage = null
    this.error = null
    this.hasMore = false
    this.nextPage = null
    this.updateStatus("")
    if (this.options.remoteUrl) {
      this.remoteResults = []
      this.updateVisibleItems([])
    } else {
      this.filterLocal(false)
    }
    this.renderSelection()
    this.emit("tam-select:close")
  }

  scheduleRemote() {
    this.startRemoteSearch(true)
  }

  startRemoteSearch(debounced) {
    clearTimeout(this.remoteTimer)
    this.cancelActiveRequest()
    this.loading = false
    this.loadingPage = null
    this.error = null
    this.page = 0
    this.nextPage = null
    this.hasMore = false
    this.remoteResults = []
    this.updateVisibleItems([])

    if (this.query.trim().length < this.options.minQueryLength) return this.renderDropdown()
    if (!debounced || this.options.debounce <= 0) return this.loadRemote(1, false)

    this.loading = true
    this.loadingPage = 1
    this.renderDropdown()
    this.remoteTimer = setTimeout(() => {
      this.remoteTimer = null
      this.loadRemote(1, false)
    }, this.options.debounce)
  }

  cancelActiveRequest() {
    if (!this.activeRequest) return
    this.activeRequest.controller.abort()
    this.activeRequest = null
  }

  cancelRemoteWork() {
    clearTimeout(this.remoteTimer)
    this.remoteTimer = null
    this.cancelActiveRequest()
  }

  async loadRemote(page = 1, append = false) {
    if (append && (this.loading || !this.hasMore || page <= this.page)) return
    if (this.query.trim().length < this.options.minQueryLength) return

    clearTimeout(this.remoteTimer)
    this.remoteTimer = null
    if (!append) {
      this.cancelActiveRequest()
      this.remoteResults = []
      this.updateVisibleItems([])
    }

    const requestId = ++this.requestSequence
    const controller = new AbortController()
    const request = { id: requestId, controller, page, query: this.query }
    this.activeRequest = request
    this.loading = true
    this.loadingPage = page
    this.error = null
    this.renderDropdown()

    try {
      const url = new URL(this.options.remoteUrl, window.location.origin)
      url.searchParams.set(this.options.queryParam, request.query)
      url.searchParams.set(this.options.pageParam, page)
      const response = await fetch(url, {
        headers: { Accept: "application/json", ...this.options.headers },
        signal: controller.signal
      })
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      const data = await response.json()
      if (this.activeRequest?.id !== requestId) return

      const rawItems = this.getPath(data, this.options.itemsPath)
      const responseItems = (Array.isArray(rawItems) ? rawItems : []).map(raw => this.upsertRemoteItem(raw))
      const combinedItems = append ? [...this.remoteResults, ...responseItems] : responseItems
      this.remoteResults = this.deduplicateByValue(combinedItems)
      this.page = page
      const pagination = this.getPath(data, this.options.paginationPath) || {}
      this.nextPage = pagination.next_page ?? null
      this.hasMore = Boolean(this.nextPage || pagination.has_more || (pagination.page && pagination.total_pages && pagination.page < pagination.total_pages))
      this.updateVisibleItems(this.remoteResults)
      this.emit("tam-select:load", { items: this.deduplicateByValue(responseItems), pagination })
    } catch (error) {
      if (this.activeRequest?.id !== requestId) return
      if (error.name !== "AbortError") {
        this.error = error.message || "Unable to load options"
        this.emit("tam-select:error", { error })
      }
    } finally {
      if (this.activeRequest?.id === requestId) {
        this.activeRequest = null
        this.loading = false
        this.loadingPage = null
        this.renderDropdown()
      }
    }
  }

  deduplicateByValue(items) {
    const seen = new Set()
    return items.filter(item => {
      const value = String(item.value)
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  }

  getPath(object, path) {
    return String(path).split(".").reduce((value, key) => value?.[key], object)
  }

  syncAria() {
    const labelledBy = this.labelledBy()
    if (labelledBy) {
      const valueReference = this.trigger ? ` ${this.valuesId}` : ""
      this.focusTarget.setAttribute("aria-labelledby", `${labelledBy}${valueReference}`)
      this.focusTarget.removeAttribute("aria-label")
    } else {
      const ariaLabel = this.select.getAttribute("aria-label") || this.options.placeholder
      this.focusTarget.setAttribute("aria-label", ariaLabel)
      if (this.trigger) this.focusTarget.setAttribute("aria-labelledby", this.valuesId)
      else this.focusTarget.removeAttribute("aria-labelledby")
    }

    const describedBy = this.select.getAttribute("aria-describedby")
    if (describedBy) this.focusTarget.setAttribute("aria-describedby", describedBy)
    else this.focusTarget.removeAttribute("aria-describedby")

    this.focusTarget.setAttribute("aria-required", String(Boolean(this.select.required)))
    this.focusTarget.setAttribute("aria-disabled", String(Boolean(this.select.disabled)))
    const nativeInvalid = this.select.getAttribute("aria-invalid")
    const invalid = this.invalidFromEvent || nativeInvalid === "true"
    if (this.invalidFromEvent) this.focusTarget.setAttribute("aria-invalid", "true")
    else if (nativeInvalid != null) this.focusTarget.setAttribute("aria-invalid", nativeInvalid)
    else this.focusTarget.removeAttribute("aria-invalid")
    toggleClasses(this.control, this.classes.controlInvalid, invalid)
  }

  applyDisabled() {
    toggleClasses(this.control, this.classes.controlDisabled, this.select.disabled)
    this.focusTarget.disabled = this.select.disabled
    this.clearButton.disabled = this.select.disabled
    this.syncAria()
  }

  refresh() {
    this.readNativeOptions()
    this.applyDisabled()
    this.renderSelection()
    this.renderDropdown()
  }

  emit(name, detail = {}) {
    this.select.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: { tamSelect: this, ...detail } }))
  }

  destroy() {
    this.cancelRemoteWork()
    document.removeEventListener("pointerdown", this.onOutside)
    this.select.removeEventListener("change", this.onNativeChange)
    this.select.removeEventListener("invalid", this.onNativeInvalid)
    this.labelElements.forEach(label => label.removeEventListener("click", this.onLabelClick))
    this.wrapper.remove()
    if (!this.hadSrOnlyClass) this.select.classList.remove("sr-only")
    if (this.originalTabIndex === null) this.select.removeAttribute("tabindex")
    else this.select.setAttribute("tabindex", this.originalTabIndex)
    if (this.originalAriaHidden === null) this.select.removeAttribute("aria-hidden")
    else this.select.setAttribute("aria-hidden", this.originalAriaHidden)
    if (this.originalId === null) this.select.removeAttribute("id")
    TamSelect.instances.delete(this.select)
  }
}

export default TamSelect
