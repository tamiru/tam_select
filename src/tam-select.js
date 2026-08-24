const DEFAULT_CLASSES = {
  wrapper: "tam-select relative w-full text-zinc-900 [color-scheme:light] dark:text-zinc-100 dark:[color-scheme:dark]",
  control: "relative flex min-h-11 w-full cursor-text flex-wrap items-center gap-2 overflow-hidden rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition duration-150 hover:border-zinc-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-black/20 dark:hover:border-zinc-600 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400/10",
  controlMultiple: "h-auto py-1.5",
  controlOpen: "border-blue-500 ring-4 ring-blue-500/10 dark:border-blue-400 dark:ring-blue-400/10",
  controlInvalid: "border-red-500 ring-4 ring-red-500/10 dark:border-red-400 dark:ring-red-400/10",
  controlDisabled: "cursor-not-allowed bg-zinc-100 opacity-60 dark:bg-zinc-800 dark:text-zinc-400",
  input: "min-w-16 flex-1 shrink basis-0 border-0 bg-transparent p-0 text-start text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500",
  inputClosed: "absolute inset-0 z-0 h-full w-full cursor-pointer opacity-0",
  trigger: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-xl border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
  searchIcon: "size-4 shrink-0 text-zinc-400 dark:text-zinc-500",
  placeholder: "pointer-events-none shrink truncate text-zinc-400 dark:text-zinc-500",
  tag: "relative z-10 inline-flex max-w-full shrink-0 items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200 transition-colors dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-800",
  tagRemove: "me-0.5 shrink-0 rounded p-0.5 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-blue-900",
  clear: "relative z-20 ms-auto shrink-0 rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:focus:ring-blue-400",
  chevron: "pointer-events-none relative z-10 ms-auto size-4 shrink-0 text-zinc-400 transition-transform",
  chevronOpen: "rotate-180",
  dropdown: "absolute z-50 mt-1.5 flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/50 dark:ring-white/10",
  dropdownSearch: "mb-1 flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 shadow-inner transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800/70 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400/10",
  results: "max-h-64 overflow-y-auto overscroll-contain scroll-py-1",
  dropdownAnimation: "origin-top-center",
  dropdownClosed: "mt-1.5 max-h-72 w-full scale-y-[0.98] opacity-0 pointer-events-none",
  dropdownOpen: "scale-y-100 opacity-100 pointer-events-auto",
  groupHeader: "px-3 pt-3 pb-1 text-xs font-semibold text-zinc-500 select-none dark:text-zinc-400",
  option: "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-zinc-700 outline-none transition-colors duration-100 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
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
  error: "px-3 py-3 text-sm text-red-600 dark:text-red-400",
  tagDragging: "opacity-50 ring-2 ring-blue-400",
  tagDragOver: "border-l-2 border-l-blue-500"
}

// DaisyUI contributes semantic colors only. Layout, spacing, borders and
// interaction states stay under Tam Select's control so DaisyUI component
// styles cannot unexpectedly reshape the generated field.
const THEME_CLASSES = {
  daisyui: {
    wrapper: "tam-select relative w-full text-base-content",
    control: "relative flex min-h-11 w-full cursor-pointer flex-wrap items-center gap-2 overflow-hidden rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm text-base-content shadow-sm transition duration-150 hover:border-base-content/30 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
    controlMultiple: "h-auto cursor-text py-1.5",
    controlOpen: "border-primary ring-4 ring-primary/10",
    controlInvalid: "border-error ring-4 ring-error/10",
    controlDisabled: "cursor-not-allowed bg-base-200/70 text-base-content/50 opacity-70 shadow-none",
    input: "min-w-16 flex-1 shrink basis-0 border-0 bg-transparent p-0 text-start text-sm text-base-content outline-none placeholder:text-base-content/50 focus:outline-none focus:ring-0",
    inputClosed: "",
    trigger: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded-xl border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed",
    searchIcon: "size-4 shrink-0 text-base-content/50",
    placeholder: "pointer-events-none shrink truncate text-base-content/50",
    tag: "relative z-10 inline-flex max-w-full shrink-0 items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20",
    tagRemove: "me-0.5 shrink-0 rounded p-0.5 transition-colors hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary",
    clear: "relative z-20 ms-auto shrink-0 rounded-md p-1 text-base-content/50 transition-colors hover:bg-base-200 hover:text-base-content focus:outline-none focus:ring-2 focus:ring-primary",
    chevron: "pointer-events-none relative z-10 ms-auto size-4 shrink-0 text-base-content/50 transition-transform",
    dropdown: "absolute z-50 mt-1.5 flex w-full flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 p-1.5 shadow-2xl ring-1 ring-base-content/5",
    dropdownSearch: "mb-1 flex shrink-0 items-center gap-2 rounded-lg border border-base-300 bg-base-200/40 px-3 py-2 shadow-inner transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
    results: "max-h-64 overflow-y-auto overscroll-contain scroll-py-1",
    dropdownAnimation: "origin-top-center",
    dropdownClosed: "mt-1.5 max-h-72 w-full scale-y-[0.98] opacity-0 pointer-events-none",
    dropdownOpen: "scale-y-100 opacity-100 pointer-events-auto",
    groupHeader: "px-3 pt-3 pb-1 text-xs font-semibold text-base-content/60 select-none",
    option: "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-base-content outline-none transition-colors duration-100 hover:bg-base-200",
    optionContent: "flex min-w-0 flex-1 items-center gap-3",
    optionText: "flex min-w-0 flex-1 flex-col",
    optionLabel: "font-normal",
    optionDetail: "text-xs font-normal text-base-content/60",
    optionImage: "size-9 shrink-0 rounded-full bg-base-200 object-cover",
    optionMeta: "shrink-0 rounded-md bg-base-200 px-1.5 py-0.5 text-xs font-medium text-base-content/70",
    optionActive: "bg-primary text-primary-content shadow-sm [&_*]:text-primary-content",
    optionSelected: "bg-primary/10 font-medium text-primary ring-1 ring-inset ring-primary/10",
    optionDisabled: "cursor-not-allowed opacity-50",
    highlight: "rounded-sm bg-warning/30 px-0.5 text-inherit",
    message: "px-3 py-6 text-center text-sm text-base-content/60",
    status: "sr-only",
    spinner: "size-4 animate-spin rounded-full border-2 border-base-300 border-t-primary",
    error: "px-3 py-3 text-sm text-error",
    tagDragging: "opacity-50 ring-2 ring-primary",
    tagDragOver: "border-l-2 border-l-primary"
  },
  select2: {
    wrapper: "tam-select relative w-full text-sm text-gray-700",
    control: "relative flex min-h-7 w-full cursor-text flex-wrap items-center gap-1 overflow-hidden rounded border border-gray-400 bg-white px-1 py-0.5 text-sm text-gray-700 transition duration-150 hover:border-gray-500 focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-300",
    controlMultiple: "min-h-8 h-auto flex-wrap py-1",
    controlOpen: "border-gray-600",
    controlInvalid: "border-red-500",
    controlDisabled: "cursor-not-allowed bg-gray-100 opacity-60",
    input: "min-w-20 flex-1 shrink basis-0 border-0 bg-transparent p-0 text-start text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-0",
    inputClosed: "absolute inset-0 z-0 h-full w-full cursor-pointer border-0 opacity-0",
    trigger: "absolute inset-0 z-0 h-full w-full cursor-pointer rounded border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
    searchIcon: "size-4 shrink-0 text-gray-400",
    placeholder: "pointer-events-none shrink truncate text-gray-400",
    tag: "relative z-10 inline-flex max-w-full shrink-0 items-center gap-1 rounded border border-gray-400 bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700",
    tagRemove: "ms-0.5 shrink-0 rounded-none border-r border-gray-400 px-1 text-gray-500 hover:bg-gray-300 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400",
    clear: "relative z-20 ms-auto shrink-0 rounded p-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400",
    chevron: "pointer-events-none relative z-10 ms-auto size-4 shrink-0 text-gray-500 transition-transform",
    dropdown: "absolute z-50 mt-0 flex w-full flex-col overflow-hidden rounded border border-gray-400 bg-white p-0",
    dropdownSearch: "flex shrink-0 items-center gap-2 border-b border-gray-300 bg-gray-50 px-2 py-1.5",
    results: "max-h-52 overflow-y-auto overscroll-contain",
    dropdownAnimation: "origin-top-center",
    dropdownClosed: "mt-0 max-h-52 w-full scale-y-95 opacity-0 pointer-events-none",
    dropdownOpen: "scale-y-100 opacity-100 pointer-events-auto",
    groupHeader: "px-2 pt-2 pb-1 text-xs font-bold text-gray-600 select-none",
    option: "flex min-h-7 cursor-pointer items-center justify-between gap-2 rounded-none px-2 py-1 text-sm text-gray-700 outline-none transition-colors duration-75 hover:bg-blue-500 hover:text-white",
    optionContent: "flex min-w-0 flex-1 items-center gap-2",
    optionText: "flex min-w-0 flex-1 flex-col",
    optionLabel: "font-normal",
    optionDetail: "text-xs font-normal text-gray-500",
    optionImage: "size-7 shrink-0 rounded bg-gray-100 object-cover",
    optionMeta: "shrink-0 rounded bg-gray-200 px-1 py-0.5 text-xs font-medium text-gray-600",
    optionActive: "bg-blue-500 text-white [&_*]:text-white",
    optionSelected: "bg-gray-200 font-medium text-gray-700",
    optionDisabled: "cursor-not-allowed opacity-50",
    highlight: "rounded-sm bg-amber-200/80 px-0.5 text-inherit",
    status: "sr-only",
    message: "px-2 py-4 text-center text-sm text-gray-500",
    spinner: "size-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
    error: "px-2 py-4 text-center text-sm text-red-600",
    tagDragging: "opacity-50 ring-2 ring-blue-400",
    tagDragOver: "border-l-2 border-l-blue-500"
  }
}

const ICONS = {
  search: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="m14.5 14.5 3 3m-1.25-8.25a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>',
  chevron: '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>',
  close: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-3" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="currentColor" class="size-4" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>'
}

const ANIMATION_PRESETS = {
  default: { duration: 150, easing: "ease-out" },
  material: { duration: 250, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  spring: { duration: 400, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  snappy: { duration: 100, easing: "ease-in" },
  smooth: { duration: 300, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
  bounce: { duration: 500, easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" },
  elastic: { duration: 600, easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)" },
  fade: { duration: 200, easing: "linear" },
  pop: { duration: 200, easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
  slide: { duration: 250, easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" },
  none: { duration: 0, easing: "ease" }
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
      createText: query => `Create "${query}"`,
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
      clearLabel: "Clear selection",
      removeLabel: item => `Remove ${item.label}`,
      selectionLimitText: limit => `You can select up to ${limit} item${limit === 1 ? "" : "s"}`,
      language: {},
      valueField: "value",
      labelField: "label",
      imageField: "image",
      itemsPath: "items",
      paginationPath: "pagination",
      matcher: null,
      theme: "auto",
      classes: {},
      headers: {},
      animations: true,
      animationPreset: null,
      animationDuration: 150,
      animationEasing: "ease-out",
      emptyState: null,
      noResultsState: null,
      loadingState: null,
      lazyLoadImages: false,
      virtualScroll: false,
      virtualScrollThreshold: 100,
      virtualScrollBuffer: 5,
      virtualItemHeight: 44,
      draggable: false,
      maximumSelectionLength: 0,
      maximumInputLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      tokenSeparators: [],
      sorter: null,
      templateResult: null,
      templateSelection: null,
      transport: null,
      processResults: null,
      remoteParams: {},
      cacheRemote: false,
      dropdownParent: null,
      width: "resolve",
      dir: "auto",
      ...options
    }
    const languageOptions = {
      placeholder: "placeholder",
      searchPlaceholder: "searchPlaceholder",
      noResults: "noResultsText",
      create: "createText",
      loading: "loadingText",
      loadMore: "loadMoreText",
      inputTooShort: "inputTooShortText",
      results: "resultsText",
      clear: "clearLabel",
      remove: "removeLabel",
      selectionLimit: "selectionLimitText"
    }
    Object.entries(languageOptions).forEach(([languageKey, optionKey]) => {
      if (hasOwn(this.options.language, languageKey) && !hasOwn(options, optionKey)) {
        this.options[optionKey] = this.options.language[languageKey]
      }
    })
    this.dir = this.options.dir === "auto" ? this.detectDirection() : this.options.dir
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
    this.typeaheadBuffer = ""
    this.typeaheadTimer = null
    this.groupTree = []
    this.closeTimer = null
    this.lazyObserver = null
    this.selectionLimitReached = false
    this.searchVisible = this.options.minimumResultsForSearch <= 0
    this.isVirtualScroll = false
    this.virtualStartIndex = 0
    this.onVirtualScroll = null
    this.remoteCache = new Map()
    this.destroyed = false
    this.refreshQueued = false
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
    this.wrapper.setAttribute("dir", this.dir)
    if (this.options.width !== "resolve") {
      this.wrapper.style.width = this.options.width
    }

    this.control = document.createElement("div")
    this.control.className = [
      this.classes.control,
      this.multiple && this.classes.controlMultiple
    ].filter(Boolean).join(" ")

    this.values = document.createElement("div")
    this.values.id = this.valuesId
    this.values.className = "contents"
    this.values.style.display = "contents"

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
      if (this.options.maximumInputLength > 0) this.input.maxLength = this.options.maximumInputLength
      this.input.setAttribute("aria-controls", this.listboxId)
      if (this.multiple) {
        this.input.setAttribute("role", "combobox")
        this.input.setAttribute("aria-haspopup", "listbox")
        this.input.setAttribute("aria-expanded", "false")
        this.input.setAttribute("aria-autocomplete", "list")
        this.focusTarget = this.input
      } else {
        this.input.type = "search"
        this.input.setAttribute("role", "searchbox")
        this.input.setAttribute("aria-label", this.options.searchPlaceholder)
      }
    }

    if (!this.multiple || !this.searchable) {
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
    this.clearButton.setAttribute("aria-label", this.options.clearLabel)
    this.clearButton.innerHTML = ICONS.close

    this.chevron = document.createElement("span")
    this.chevron.className = this.classes.chevron
    this.chevron.innerHTML = ICONS.chevron

    this.dropdown = document.createElement("div")
    this.dropdown.id = `${this.id}-dropdown`
    this.dropdown.className = `${this.classes.dropdown} hidden`
    if (this.options.animations) {
      const preset = this.options.animationPreset ? ANIMATION_PRESETS[this.options.animationPreset] : null
      const duration = preset ? preset.duration : this.options.animationDuration
      const easing = preset ? preset.easing : this.options.animationEasing
      this.options.animationDuration = duration
      this.options.animationEasing = easing
      toggleClasses(this.dropdown, this.classes.dropdownAnimation, true)
      this.dropdown.style.setProperty("--tam-duration", `${duration}ms`)
      this.dropdown.style.setProperty("--tam-easing", easing)
      this.dropdown.style.transition = `all var(--tam-duration) var(--tam-easing)`
    }
    this.results = document.createElement("div")
    this.results.id = this.listboxId
    this.results.className = this.classes.results
    this.results.setAttribute("role", "listbox")
    if (this.multiple) this.results.setAttribute("aria-multiselectable", "true")

    if (this.searchable && !this.multiple) {
      this.searchPanel = document.createElement("div")
      this.searchPanel.className = this.classes.dropdownSearch
      this.searchPanel.append(this.searchIcon, this.input)
      this.dropdown.append(this.searchPanel, this.results)
    } else {
      this.dropdown.append(this.results)
    }

    this.status = document.createElement("div")
    this.status.className = this.classes.status
    this.status.setAttribute("role", "status")
    this.status.setAttribute("aria-live", "polite")
    this.status.setAttribute("aria-atomic", "true")

    const focusControl = this.multiple && this.searchable ? [this.searchIcon, this.input] : [this.trigger]
    this.control.append(this.values, ...focusControl, this.clearButton, this.chevron)
    this.wrapper.append(this.control, this.status)
    this.select.after(this.wrapper)
    this.dropdownParent = this.resolveDropdownParent()
    this.portalDropdown = Boolean(this.dropdownParent)
    if (this.portalDropdown) {
      this.dropdownParent.append(this.dropdown)
      this.dropdown.style.position = "fixed"
    } else {
      this.wrapper.append(this.dropdown)
    }
    this.labelElements = this.findLabelElements()
    this.applyDisabled()
    this.syncAria()
    this.initLazyObserver()
  }

  bind() {
    this.onControlClick = event => {
      if (!this.searchable || this.select.disabled || event.target.closest("button")) return
      this.open()
      this.input.focus()
    }
    this.onInput = () => {
      this.query = this.input.value
      if (this.multiple && this.options.tokenSeparators.length && this.options.creatable) {
        this.tokenizeInput()
      }
      this.open(false)
      if (this.options.remoteUrl) this.scheduleRemote()
      else this.filterLocal()
    }
    this.onKeydown = event => this.handleKeydown(event)
    this.onClear = event => { event.stopPropagation(); this.clear() }
    this.onTrigger = event => { event.preventDefault(); this.open() }
    this.onOutside = event => {
      if (!this.wrapper.contains(event.target) && !this.dropdown.contains(event.target)) this.close()
    }
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
      if (this.options.remoteUrl && this.hasMore && !this.loading) {
        if (this.results.scrollTop + this.results.clientHeight >= this.results.scrollHeight - 32) {
          this.loadRemote(this.nextPage || this.page + 1, true)
        }
      }
      if (this.isVirtualScroll) {
        this.rerenderVirtualItems()
      }
    }
    this.onLabelClick = event => {
      if (event.target.closest("a, button, input, select, textarea")) return
      event.preventDefault()
      this.focusTarget.focus()
    }
    this.onFormReset = () => queueMicrotask(() => this.refresh())
    this.onViewportChange = () => { if (this.opened && this.portalDropdown) this.updateDropdownPosition() }

    this.control.addEventListener("click", this.onControlClick)
    this.focusTarget.addEventListener("keydown", this.onKeydown)
    if (this.input && this.input !== this.focusTarget) this.input.addEventListener("keydown", this.onKeydown)
    if (this.input) this.input.addEventListener("input", this.onInput)
    if (this.trigger) this.trigger.addEventListener("click", this.onTrigger)
    this.clearButton.addEventListener("click", this.onClear)
    this.results.addEventListener("scroll", this.onScroll)
    this.select.addEventListener("change", this.onNativeChange)
    this.select.addEventListener("invalid", this.onNativeInvalid)
    this.labelElements.forEach(label => label.addEventListener("click", this.onLabelClick))
    document.addEventListener("pointerdown", this.onOutside)
    this.select.form?.addEventListener("reset", this.onFormReset)
    window.addEventListener("resize", this.onViewportChange)
    window.addEventListener("scroll", this.onViewportChange, true)
    this.mutationObserver = new MutationObserver(() => this.queueRefresh())
    this.mutationObserver.observe(this.select, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "label", "value", "selected", "required", "aria-invalid", "aria-describedby", "data-detail", "data-meta", "data-image"]
    })
  }

  resolveDropdownParent() {
    if (!this.options.dropdownParent) return null
    if (typeof this.options.dropdownParent === "string") return document.querySelector(this.options.dropdownParent)
    const ElementClass = this.select.ownerDocument.defaultView.Element
    return this.options.dropdownParent instanceof ElementClass ? this.options.dropdownParent : null
  }

  queueRefresh() {
    if (this.refreshQueued || this.destroyed) return
    this.refreshQueued = true
    queueMicrotask(() => {
      this.refreshQueued = false
      if (!this.destroyed && this.select.isConnected) this.refresh()
    })
  }

  updateDropdownPosition() {
    if (!this.portalDropdown) return
    const rect = this.control.getBoundingClientRect()
    const gap = 6
    const estimatedHeight = Math.min(this.dropdown.scrollHeight || 288, 288)
    const placeAbove = window.innerHeight - rect.bottom < estimatedHeight + gap && rect.top > estimatedHeight + gap
    this.dropdown.style.left = `${rect.left}px`
    this.dropdown.style.width = `${rect.width}px`
    this.dropdown.style.top = `${placeAbove ? Math.max(gap, rect.top - estimatedHeight - gap) : rect.bottom + gap}px`
    this.dropdown.dataset.placement = placeAbove ? "top" : "bottom"
  }

  detectDirection() {
    const selectDir = this.select.getAttribute("dir")
    if (selectDir) return selectDir
    const docDir = document.documentElement.getAttribute("dir") || document.body?.getAttribute("dir")
    if (docDir) return docDir
    return "ltr"
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
    this.previousItemsByOption = new Map(this.items.map(item => [item.option, item]))
    const parsed = this.parseGroups()
    this.previousItemsByOption = null
    this.groupTree = parsed.tree
    this.items = parsed.flat

    if (this.options.remoteUrl) {
      const currentItems = new Map(this.items.map(item => [item.option, item]))
      this.remoteResults = this.remoteResults.map(item => currentItems.get(item.option)).filter(Boolean)
      this.updateVisibleItems(this.remoteResults)
    } else {
      this.filterLocal(false)
    }
  }

  parseGroups() {
    const tree = []
    const flat = []
    const children = Array.from(this.select.children)

    for (const child of children) {
      if (child.tagName === "OPTGROUP") {
        const group = { label: child.label, items: [], entries: [] }
        for (const option of child.querySelectorAll("option")) {
          if (option.value === "") continue
          const item = this.buildItem(option)
          item.group = group.label
          flat.push(item)
          group.items.push(item)
          group.entries.push({ type: "item", id: item.id, item, disabled: Boolean(item.disabled) })
        }
        if (group.items.length > 0) tree.push(group)
      } else if (child.tagName === "OPTION" && child.value !== "") {
        const item = this.buildItem(child)
        flat.push(item)
        tree.push({ type: "ungrouped", items: [item], entries: [{ type: "item", id: item.id, item, disabled: Boolean(item.disabled) }] })
      }
    }
    return { tree, flat }
  }

  buildItem(option) {
    const attributes = {
      id: this.optionId(option),
      value: option.value,
      label: option.textContent.trim(),
      detail: option.dataset.detail || null,
      meta: option.dataset.meta || null,
      image: option.dataset.image || null,
      disabled: option.disabled,
      selected: option.selected,
      option,
      group: null
    }
    const existing = this.previousItemsByOption?.get(option)
    return existing ? Object.assign(existing, attributes) : attributes
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
    matches = this.sortResults(matches)
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
    const hasGroups = this.groupTree.some(group => group.type !== "ungrouped")

    let entries
    if (!hasGroups) {
      entries = candidateItems
        .filter(item => this.multiple || !item.selected)
        .map(item => ({ type: "item", id: item.id, item, disabled: Boolean(item.disabled) }))
    } else {
      const visibleValues = new Set(candidateItems.map(item => String(item.value)))
      entries = []
      for (const group of this.groupTree) {
        if (group.type === "ungrouped") {
          for (const entry of group.entries) {
            if (visibleValues.has(String(entry.item.value)) && (this.multiple || !entry.item.selected)) {
              entries.push(entry)
            }
          }
        } else {
          const groupEntries = group.entries.filter(entry =>
            visibleValues.has(String(entry.item.value)) && (this.multiple || !entry.item.selected)
          )
          if (groupEntries.length > 0) {
            entries.push({ type: "group-header", id: `group-${group.label}`, group: group.label })
            entries.push(...groupEntries)
          }
        }
      }
    }

    const createEntry = this.createEntry()
    if (createEntry) entries.push(createEntry)

    this.visibleItems = entries
    const preservedIndex = previousId ? entries.findIndex(entry => entry.id === previousId && !entry.disabled) : -1
    this.activeIndex = preservedIndex >= 0 ? preservedIndex : entries.findIndex(entry => !entry.disabled && entry.type !== "group-header")
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

  typeahead(char) {
    if (!this.opened) return
    clearTimeout(this.typeaheadTimer)
    this.typeaheadBuffer += char
    this.typeaheadTimer = setTimeout(() => { this.typeaheadBuffer = "" }, 500)

    const query = normalize(this.typeaheadBuffer)
    const startIndex = this.activeIndex >= 0 ? this.activeIndex + 1 : 0
    const candidates = [...this.visibleItems.slice(startIndex), ...this.visibleItems.slice(0, startIndex)]
    const match = candidates.find(entry =>
      entry.type !== "group-header" && !entry.disabled && normalize(entry.item?.label ?? entry.label).startsWith(query)
    )
    if (match) {
      const index = this.visibleItems.indexOf(match)
      this.activeIndex = index
      this.updateActiveOption()
    }
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
    const atLimit = this.multiple && this.options.maximumSelectionLength > 0 && selected.length >= this.options.maximumSelectionLength
    this.selectionLimitReached = atLimit
    this.values.classList.remove("hidden")
    this.searchIcon.classList.toggle("hidden", !this.searchable || !this.searchVisible)
    if (this.searchPanel) this.searchPanel.classList.toggle("hidden", !this.searchVisible)
    if (this.input) {
      toggleClasses(this.input, this.classes.inputClosed, false)
      this.input.placeholder = this.multiple && !hasValue ? this.options.placeholder : this.options.searchPlaceholder
      if (atLimit) this.input.disabled = true
      else this.input.disabled = this.select.disabled
    }
    this.clearButton.classList.toggle("hidden", !this.options.clearable || !hasValue || this.select.disabled)
    this.syncAria()
  }

  makeTag(item) {
    const tag = document.createElement("span")
    tag.className = this.classes.tag
    tag.style.maxWidth = "100%"
    tag.style.minWidth = "0"
    tag.dataset.tagValue = item.value
    const label = document.createElement("span")
    label.className = "max-w-48 truncate"
    label.style.minWidth = "0"
    label.style.overflow = "hidden"
    label.style.textOverflow = "ellipsis"
    label.style.whiteSpace = "nowrap"
    const template = this.renderTemplate(this.options.templateSelection, item, "selection")
    if (template) label.append(template)
    else label.textContent = item.label
    const remove = document.createElement("button")
    remove.type = "button"
    remove.className = this.classes.tagRemove
    remove.disabled = this.select.disabled
    const removeLabel = typeof this.options.removeLabel === "function" ? this.options.removeLabel(item) : this.options.removeLabel
    remove.setAttribute("aria-label", removeLabel)
    remove.innerHTML = ICONS.close
    remove.addEventListener("click", event => { event.stopPropagation(); this.deselect(item.value) })
    tag.append(label, remove)
    if (this.options.draggable && this.multiple && !this.select.disabled) {
      tag.setAttribute("draggable", "true")
      tag.style.cursor = "grab"
      tag.addEventListener("dragstart", event => this.onTagDragStart(event, item))
      tag.addEventListener("dragend", () => this.onTagDragEnd())
      tag.addEventListener("dragover", event => this.onTagDragOver(event))
      tag.addEventListener("dragenter", event => this.onTagDragEnter(event))
      tag.addEventListener("dragleave", event => this.onTagDragLeave(event))
      tag.addEventListener("drop", event => this.onTagDrop(event, item))
    }
    return tag
  }

  onTagDragStart(event, item) {
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", item.value)
    this.draggedItem = item
    const scheduleFrame = window.requestAnimationFrame || (callback => window.setTimeout(callback, 0))
    scheduleFrame(() => {
      event.target.classList.add(this.classes.tagDragging)
    })
  }

  onTagDragEnd() {
    this.draggedItem = null
    this.values.querySelectorAll("[data-tag-value]").forEach(el => {
      el.classList.remove(this.classes.tagDragging, this.classes.tagDragOver)
    })
  }

  onTagDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  onTagDragEnter(event) {
    event.preventDefault()
    const tag = event.target.closest("[data-tag-value]")
    if (tag && tag.dataset.tagValue !== this.draggedItem?.value) {
      tag.classList.add(this.classes.tagDragOver)
    }
  }

  onTagDragLeave(event) {
    const tag = event.target.closest("[data-tag-value]")
    if (tag) tag.classList.remove(this.classes.tagDragOver)
  }

  onTagDrop(event, targetItem) {
    event.preventDefault()
    const sourceItem = this.draggedItem
    if (!sourceItem || sourceItem.value === targetItem.value) return

    const sourceIndex = this.selectedItems().findIndex(i => i.value === sourceItem.value)
    const targetIndex = this.selectedItems().findIndex(i => i.value === targetItem.value)
    if (sourceIndex < 0 || targetIndex < 0) return

    const option = this.select.querySelector(`option[value="${sourceItem.value}"]`)
    const targetOption = this.select.querySelector(`option[value="${targetItem.value}"]`)
    if (option && targetOption) {
      if (sourceIndex < targetIndex) {
        targetOption.after(option)
      } else {
        targetOption.before(option)
      }
    }

    this.readNativeOptions()
    this.renderSelection()
    this.emit("tam-select:reorder", { value: this.value, items: this.selectedItems() })
  }

  renderDropdown() {
    if (!this.opened) return
    this.results.replaceChildren()
    this.results.setAttribute("aria-busy", String(this.loading))

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
      this.results.append(error)
      this.updateStatus(this.error)
      return this.syncActiveDescendant()
    }
    if (this.loading && this.loadingPage === 1) {
      this.renderMessage(this.options.loadingText, true)
      this.updateStatus(this.options.loadingText)
      return this.syncActiveDescendant()
    }

    if (this.options.emptyState && !this.visibleItems.length && !this.loading) {
      const empty = document.createElement("div")
      empty.className = this.classes.message
      if (typeof this.options.emptyState === "function") this.options.emptyState(empty)
      else empty.textContent = this.options.emptyState
      this.results.append(empty)
      this.updateStatus("")
      return this.syncActiveDescendant()
    }

    const shouldVirtual = this.options.virtualScroll || this.visibleItems.length > this.options.virtualScrollThreshold
    if (shouldVirtual && this.visibleItems.length > 0) {
      this.renderVirtualDropdown()
    } else {
      this.renderStandardDropdown()
    }

    if (!this.visibleItems.length) {
      if (this.options.noResultsState) {
        const noResults = document.createElement("div")
        noResults.className = this.classes.message
        if (typeof this.options.noResultsState === "function") this.options.noResultsState(noResults)
        else noResults.textContent = this.options.noResultsState
        this.results.append(noResults)
      } else {
        this.renderMessage(this.options.noResultsText)
      }
    }
    if (this.loading && this.loadingPage > 1) this.renderMessage(this.options.loadingText, true)
    else if (this.hasMore) this.renderMessage(this.options.loadMoreText)
    const resultCount = this.visibleItems.filter(entry => entry.type === "item").length
    const statusText = resultCount || this.visibleItems.length
        ? (typeof this.options.resultsText === "function" ? this.options.resultsText(resultCount) : this.options.resultsText)
        : this.options.noResultsText
    this.updateStatus(statusText)
    this.syncActiveDescendant()
  }

  renderStandardDropdown() {
    for (const entry of this.visibleItems) {
      if (entry.type === "group-header") {
        this.results.append(this.makeGroupHeader(entry))
      } else {
        const index = this.visibleItems.indexOf(entry)
        this.results.append(this.makeOption(entry, index))
      }
    }
  }

  renderVirtualDropdown() {
    this.isVirtualScroll = true
    const itemHeight = this.options.virtualItemHeight
    const buffer = this.options.virtualScrollBuffer
    const total = this.visibleItems.length
    const totalHeight = total * itemHeight
    const scrollTop = this.results.scrollTop || 0
    const viewportHeight = this.results.clientHeight || 288
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
    const end = Math.min(total, Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer)

    if (start > 0) {
      const topSpacer = document.createElement("div")
      topSpacer.style.height = `${start * itemHeight}px`
      topSpacer.dataset.virtualSpacer = "top"
      this.results.append(topSpacer)
    }

    for (let i = start; i < end; i++) {
      const entry = this.visibleItems[i]
      if (entry.type === "group-header") {
        this.results.append(this.makeGroupHeader(entry))
      } else {
        this.results.append(this.makeOption(entry, i))
      }
    }

    if (end < total) {
      const bottomSpacer = document.createElement("div")
      bottomSpacer.style.height = `${(total - end) * itemHeight}px`
      bottomSpacer.dataset.virtualSpacer = "bottom"
      this.results.append(bottomSpacer)
    }
  }

  rerenderVirtualItems() {
    if (!this.isVirtualScroll || !this.opened) return
    const children = Array.from(this.results.children)
    children.forEach(child => child.remove())
    this.renderVirtualDropdown()
    this.syncActiveDescendant()
  }

  makeGroupHeader(entry) {
    const header = document.createElement("div")
    header.className = this.classes.groupHeader
    header.setAttribute("role", "presentation")
    header.textContent = entry.group
    header.style.pointerEvents = "none"
    header.dataset.tamSelectGroup = entry.group
    return header
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
    content.style.minWidth = "0"
    content.style.maxWidth = "100%"
    if (selected) content.classList.add("min-w-0", "flex-1")
    const template = this.renderTemplate(selected ? this.options.templateSelection : this.options.templateResult, item, selected ? "selection" : "result")
    if (template) {
      content.append(template)
      return content
    }
    if (item.image) {
      const image = this.options.lazyLoadImages ? this.makeLazyImage(item) : document.createElement("img")
      if (!this.options.lazyLoadImages) {
        image.className = this.classes.optionImage
        image.src = item.image
        image.alt = ""
        image.loading = "lazy"
      }
      content.append(image)
    }
    const text = document.createElement("span")
    text.className = this.classes.optionText
    text.style.minWidth = "0"
    text.style.overflow = "hidden"
    const label = document.createElement("span")
    label.className = `${this.classes.optionLabel} truncate`
    label.style.overflow = "hidden"
    label.style.textOverflow = "ellipsis"
    label.style.whiteSpace = "nowrap"
    if (selected) label.textContent = item.label
    else this.renderHighlightedText(label, item.label)
    text.append(label)
    if (item.detail) {
      const detail = document.createElement("span")
      detail.className = `${this.classes.optionDetail} truncate`
      detail.style.overflow = "hidden"
      detail.style.textOverflow = "ellipsis"
      detail.style.whiteSpace = "nowrap"
      if (selected) detail.textContent = item.detail
      else this.renderHighlightedText(detail, item.detail)
      text.append(detail)
    }
    content.append(text)
    return content
  }

  renderTemplate(template, item, context) {
    if (typeof template !== "function") return null
    const rendered = template(item, { tamSelect: this, context })
    if (rendered == null || rendered === false) return null
    if (rendered instanceof Node) return rendered
    const text = document.createElement("span")
    text.textContent = String(rendered)
    return text
  }

  makeLazyImage(item) {
    const image = document.createElement("img")
    image.className = this.classes.optionImage
    image.alt = ""
    image.dataset.lazySrc = item.image
    if (this.lazyObserver) this.lazyObserver.observe(image)
    else image.src = item.image
    return image
  }

  initLazyObserver() {
    if (!this.options.lazyLoadImages) return
    this.lazyObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.lazySrc) {
            img.src = img.dataset.lazySrc
            delete img.dataset.lazySrc
          }
          this.lazyObserver.unobserve(img)
        }
      }
    }, { root: this.dropdown, rootMargin: "50px" })
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
    if (this.options.loadingState && spinner) {
      const state = document.createElement("div")
      state.className = this.classes.message
      state.setAttribute("role", "status")
      if (typeof this.options.loadingState === "function") this.options.loadingState(state)
      else state.textContent = this.options.loadingState
      this.results.append(state)
      return
    }
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
    this.results.append(message)
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
      this.close(false)
    } else if (event.key === "Home" && this.opened) {
      event.preventDefault()
      this.moveActiveToFirst()
    } else if (event.key === "End" && this.opened) {
      event.preventDefault()
      this.moveActiveToLast()
    } else if (event.key === "a" && (event.ctrlKey || event.metaKey) && this.multiple && this.opened) {
      event.preventDefault()
      this.toggleAll()
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (this.opened) {
        this.typeahead(event.key)
      } else if (this.input) {
        this.open(false)
      }
    }
  }

  moveActive(direction) {
    if (!this.visibleItems.length) return
    let next = this.activeIndex
    for (let count = 0; count < this.visibleItems.length; count += 1) {
      next = (next + direction + this.visibleItems.length) % this.visibleItems.length
      const entry = this.visibleItems[next]
      if (entry.type !== "group-header" && !entry.disabled) {
        this.activeIndex = next
        return this.updateActiveOption()
      }
    }
  }

  moveActiveToFirst() {
    if (!this.visibleItems.length) return
    const first = this.visibleItems.findIndex(entry => entry.type !== "group-header" && !entry.disabled)
    if (first >= 0) { this.activeIndex = first; this.updateActiveOption() }
  }

  moveActiveToLast() {
    if (!this.visibleItems.length) return
    const last = this.visibleItems.findLastIndex(entry => entry.type !== "group-header" && !entry.disabled)
    if (last >= 0) { this.activeIndex = last; this.updateActiveOption() }
  }

  toggleAll() {
    const visibleEntries = this.visibleItems.filter(entry => entry.type === "item" && !entry.disabled)
    const allSelected = visibleEntries.every(entry => entry.item.selected)
    let selectedCount = this.selectedItems().length
    visibleEntries.forEach(entry => {
      const canSelect = this.options.maximumSelectionLength <= 0 || selectedCount < this.options.maximumSelectionLength
      const nextSelected = allSelected ? false : (entry.item.selected || canSelect)
      if (!entry.item.selected && nextSelected) selectedCount += 1
      if (entry.item.selected && !nextSelected) selectedCount -= 1
      entry.item.selected = nextSelected
      if (entry.item.option) entry.item.option.selected = entry.item.selected
    })
    this.commit()
  }

  updateActiveOption() {
    this.results.querySelectorAll("[data-tam-select-entry]").forEach(option => {
      const index = Number(option.dataset.tamSelectEntry)
      const entry = this.visibleItems[index]
      if (entry && entry.type !== "group-header") {
        toggleClasses(option, this.classes.optionActive, index === this.activeIndex)
      }
    })
    this.syncActiveDescendant(true)
  }

  syncActiveDescendant(scroll = false) {
    const entry = this.visibleItems[this.activeIndex]
    const active = entry && this.results.querySelector(`[data-tam-select-entry="${this.activeIndex}"]`)
    const activeTarget = this.opened && this.input && !this.multiple ? this.input : this.focusTarget
    this.focusTarget.removeAttribute("aria-activedescendant")
    if (this.input && this.input !== this.focusTarget) this.input.removeAttribute("aria-activedescendant")
    if (this.opened && active && !entry.disabled && entry.type !== "group-header") {
      activeTarget.setAttribute("aria-activedescendant", entry.id)
      if (scroll) active.scrollIntoView({ block: "nearest" })
    }
  }

  activateEntry(entry) {
    if (!entry || entry.disabled) return
    if (entry.type === "create") this.createItem(entry.label, entry.value)
    else this.toggleItem(entry.item)
  }

  toggleItem(item) {
    if (item.disabled) return
    if (this.multiple && item.selected) {
      this.deselect(item.value)
    } else if (this.multiple && this.options.maximumSelectionLength > 0) {
      const selectedCount = this.selectedItems().length
      if (selectedCount >= this.options.maximumSelectionLength) {
        const text = typeof this.options.selectionLimitText === "function"
          ? this.options.selectionLimitText(this.options.maximumSelectionLength)
          : this.options.selectionLimitText
        this.updateStatus(text)
        return
      }
      this.selectValue(item.value)
    } else {
      this.selectValue(item.value)
    }
  }

  selectValue(value) {
    const item = this.ensureNativeOption(value)
    if (item.disabled) return
    if (!this.emit("tam-select:selecting", { item }, true)) return
    if (this.multiple && this.options.maximumSelectionLength > 0) {
      if (this.selectedItems().length >= this.options.maximumSelectionLength) {
        const text = typeof this.options.selectionLimitText === "function"
          ? this.options.selectionLimitText(this.options.maximumSelectionLength)
          : this.options.selectionLimitText
        this.updateStatus(text)
        return
      }
    }
    if (!this.multiple) Array.from(this.select.options).forEach(option => { option.selected = false })
    item.option.selected = true
    item.selected = true
    this.commit()
    this.emit("tam-select:select", { item })
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
    if (!this.emit("tam-select:unselecting", { item }, true)) return
    item.selected = false
    if (item.option) item.option.selected = false
    this.commit()
    this.emit("tam-select:unselect", { item })
  }

  clear() {
    const items = this.selectedItems()
    if (!items.length || !this.emit("tam-select:clearing", { items }, true)) return
    Array.from(this.select.options).forEach(option => { option.selected = false })
    this.items.forEach(item => { item.selected = false })
    this.commit()
    this.emit("tam-select:clear", { items })
  }

  createItem(label, candidateValue = undefined) {
    const value = candidateValue ?? (typeof this.options.createValue === "function" ? this.options.createValue(label) : label)
    const existing = this.items.find(item => normalize(item.value) === normalize(value) || normalize(item.label) === normalize(label))
    if (existing) {
      this.selectValue(existing.value)
      return existing
    }
    if (!this.emit("tam-select:creating", { label, value: String(value) }, true)) return null
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
    if (!this.emit("tam-select:opening", {}, true)) return
    clearTimeout(this.closeTimer)
    this.opened = true
    if (this.options.minimumResultsForSearch > 0) {
      const totalOptions = this.options.remoteUrl ? Infinity : this.items.length
      this.searchVisible = totalOptions >= this.options.minimumResultsForSearch
      this.renderSelection()
    }
    this.dropdown.classList.remove("hidden")
    if (this.options.animations) {
      toggleClasses(this.dropdown, this.classes.dropdownClosed, false)
      toggleClasses(this.dropdown, this.classes.dropdownOpen, true)
    }
    this.focusTarget.setAttribute("aria-expanded", "true")
    toggleClasses(this.control, this.classes.controlOpen, true)
    toggleClasses(this.chevron, this.classes.chevronOpen, true)
    this.renderSelection()
    if (this.options.remoteUrl && loadRemote) this.startRemoteSearch(false)
    else this.renderDropdown()
    if (this.portalDropdown) {
      const scheduleFrame = window.requestAnimationFrame || (callback => window.setTimeout(callback, 0))
      scheduleFrame(() => this.updateDropdownPosition())
    }
    const openTarget = this.searchable && !this.multiple ? this.input : this.focusTarget
    openTarget.focus({ preventScroll: true })
    this.emit("tam-select:open")
  }

  close(restoreFocus = true) {
    if (!this.opened) return
    if (!this.emit("tam-select:closing", {}, true)) return
    this.opened = false
    if (this.options.selectOnClose && this.activeIndex >= 0) {
      const entry = this.visibleItems[this.activeIndex]
      if (entry && entry.type !== "group-header" && !entry.disabled) this.activateEntry(entry)
    }
    this.cancelRemoteWork()
    this.focusTarget.setAttribute("aria-expanded", "false")
    toggleClasses(this.control, this.classes.controlOpen, false)
    this.focusTarget.removeAttribute("aria-activedescendant")
    if (this.input && this.input !== this.focusTarget) this.input.removeAttribute("aria-activedescendant")
    toggleClasses(this.chevron, this.classes.chevronOpen, false)
    if (this.input) this.input.value = ""
    this.query = ""
    this.loading = false
    this.loadingPage = null
    this.error = null
    this.hasMore = false
    this.nextPage = null
    this.isVirtualScroll = false
    this.updateStatus("")
    if (this.options.remoteUrl) {
      this.remoteResults = []
      this.updateVisibleItems([])
    } else {
      this.filterLocal(false)
    }
    this.renderSelection()
    if (restoreFocus && !this.multiple && this.input && document.activeElement === this.input) {
      this.focusTarget.focus({ preventScroll: true })
    }

    if (this.options.animations) {
      toggleClasses(this.dropdown, this.classes.dropdownOpen, false)
      toggleClasses(this.dropdown, this.classes.dropdownClosed, true)
      const hide = () => {
        this.dropdown.classList.add("hidden")
        this.dropdown.removeEventListener("transitionend", hide)
      }
      this.dropdown.addEventListener("transitionend", hide, { once: true })
      this.closeTimer = setTimeout(hide, this.options.animationDuration + 50)
    } else {
      this.dropdown.classList.add("hidden")
    }
    this.emit("tam-select:close")
  }

  focus() {
    if (!this.select.disabled) this.focusTarget.focus()
  }

  blur() {
    this.focusTarget.blur()
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
      const extraParams = typeof this.options.remoteParams === "function"
        ? this.options.remoteParams({ query: request.query, page, tamSelect: this })
        : this.options.remoteParams
      Object.entries(extraParams || {}).forEach(([key, value]) => {
        if (value != null) url.searchParams.set(key, String(value))
      })
      const cacheKey = url.toString()
      let data = this.options.cacheRemote ? this.remoteCache.get(cacheKey) : null
      if (!data) {
        const transportOptions = {
          url,
          query: request.query,
          page,
          headers: { Accept: "application/json", ...this.options.headers },
          signal: controller.signal,
          tamSelect: this
        }
        const result = typeof this.options.transport === "function"
          ? await this.options.transport(transportOptions)
          : await fetch(url, { headers: transportOptions.headers, signal: controller.signal })
        if (result && typeof result.json === "function") {
          if (!result.ok) throw new Error(`Request failed (${result.status})`)
          data = await result.json()
        } else {
          data = result
        }
        if (this.options.cacheRemote) this.remoteCache.set(cacheKey, data)
      }
      if (typeof this.options.processResults === "function") {
        data = await this.options.processResults(data, { query: request.query, page, tamSelect: this })
      }
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

  emit(name, detail = {}, cancelable = false) {
    return this.select.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      cancelable,
      detail: { tamSelect: this, ...detail }
    }))
  }

  clearRemoteCache() {
    this.remoteCache.clear()
  }

  tokenizeInput() {
    if (!this.input) return
    const value = this.input.value
    const separators = this.options.tokenSeparators
    let hasToken = false
    for (const sep of separators) {
      if (value.includes(sep)) {
        hasToken = true
        break
      }
    }
    if (!hasToken) return
    const tokens = value.split(new RegExp(separators.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'))).filter(Boolean)
    tokens.forEach(token => {
      const trimmed = token.trim()
      if (trimmed) this.createItem(trimmed)
    })
    this.input.value = ""
    this.query = ""
    this.filterLocal()
  }

  sortResults(items) {
    if (typeof this.options.sorter === "function") {
      return this.options.sorter(items)
    }
    return items
  }

  addData(raw) {
    const items = Array.isArray(raw) ? raw : [raw]
    items.forEach(data => this.addItem(data))
    this.readNativeOptions()
    this.renderSelection()
    if (this.opened) this.renderDropdown()
    this.emit("tam-select:data:add", { items: items.map(d => this.items.find(i => String(i.value) === String(d.value ?? d[this.options.valueField]))) })
  }

  removeData(values) {
    const rawValues = Array.isArray(values) ? values : [values]
    const removed = []
    rawValues.forEach(value => {
      const item = this.items.find(i => String(i.value) === String(value))
      if (item) {
        if (item.option) item.option.remove()
        this.items = this.items.filter(i => i !== item)
        removed.push(item)
      }
    })
    if (removed.length) {
      this.readNativeOptions()
      this.renderSelection()
      if (this.opened) this.renderDropdown()
      this.emit("tam-select:data:remove", { items: removed })
    }
  }

  destroy() {
    this.destroyed = true
    this.cancelRemoteWork()
    clearTimeout(this.closeTimer)
    clearTimeout(this.typeaheadTimer)
    if (this.lazyObserver) { this.lazyObserver.disconnect(); this.lazyObserver = null }
    document.removeEventListener("pointerdown", this.onOutside)
    window.removeEventListener("resize", this.onViewportChange)
    window.removeEventListener("scroll", this.onViewportChange, true)
    this.select.form?.removeEventListener("reset", this.onFormReset)
    this.mutationObserver?.disconnect()
    this.select.removeEventListener("change", this.onNativeChange)
    this.select.removeEventListener("invalid", this.onNativeInvalid)
    this.focusTarget.removeEventListener("keydown", this.onKeydown)
    if (this.input && this.input !== this.focusTarget) this.input.removeEventListener("keydown", this.onKeydown)
    this.results.removeEventListener("scroll", this.onScroll)
    this.labelElements.forEach(label => label.removeEventListener("click", this.onLabelClick))
    this.wrapper.remove()
    if (this.portalDropdown) this.dropdown.remove()
    if (!this.hadSrOnlyClass) this.select.classList.remove("sr-only")
    if (this.originalTabIndex === null) this.select.removeAttribute("tabindex")
    else this.select.setAttribute("tabindex", this.originalTabIndex)
    if (this.originalAriaHidden === null) this.select.removeAttribute("aria-hidden")
    else this.select.setAttribute("aria-hidden", this.originalAriaHidden)
    if (this.originalId === null) this.select.removeAttribute("id")
    TamSelect.instances.delete(this.select)
  }
}

export { ANIMATION_PRESETS }
export default TamSelect
