const THEME_CLASSES = {
  select2: {
    wrapper: "tam-select relative w-full text-sm text-gray-700",
    control: "relative flex min-h-11 w-full touch-manipulation cursor-text flex-wrap items-center gap-1.5 overflow-hidden rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-800 transition duration-150 hover:border-gray-400 focus-within:border-blue-500 focus-within:outline-2 focus-within:outline-blue-500/20 focus-within:outline-offset-2",
    controlMultiple: "h-auto min-h-11 py-2",
    controlOpen: "border-blue-500 outline-2 outline-blue-500/20 outline-offset-2",
    controlInvalid: "border-red-500 outline-2 outline-red-500/20 outline-offset-2",
    controlDisabled: "cursor-not-allowed bg-gray-50 opacity-60",
    input: "min-w-20 flex-1 shrink basis-0 border-0 bg-transparent p-0 text-start text-base font-normal text-gray-800 outline-none placeholder:font-normal placeholder:text-gray-400 focus:ring-0 sm:text-sm",
    inputClosed: "absolute inset-0 z-[1] h-full w-full cursor-pointer opacity-0",
    trigger: "absolute inset-0 z-0 h-full w-full touch-manipulation cursor-pointer rounded-md border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
    searchIcon: "size-3.5 shrink-0 text-gray-400",
    placeholder: "pointer-events-none min-w-0 flex-1 truncate font-normal text-gray-400",
    tag: "relative z-10 inline-flex max-w-full shrink-0 items-center gap-1 rounded bg-gray-100 border border-gray-300 px-1.5 py-0.5 text-xs font-medium text-gray-700",
    tagRemove: "me-0.5 shrink-0 rounded p-0.5 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500",
    clear: "relative z-20 inline-flex size-5 shrink-0 touch-manipulation items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500",
    chevron: "pointer-events-none relative z-10 size-3.5 shrink-0 text-gray-400 transition-transform",
    chevronOpen: "rotate-180",
    dropdown: "absolute z-50 mt-1 flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg",
    dropdownSearch: "mb-0.5 flex w-full min-w-0 max-w-full shrink-0 items-center gap-1.5 rounded bg-gray-50 px-2 py-1.5",
    results: "max-h-56 w-full min-w-0 max-w-full overflow-y-auto overscroll-contain scroll-py-0.5",
    dropdownAnimation: "origin-top",
    dropdownClosed: "mt-1 max-h-64 w-full scale-y-[0.97] opacity-0 pointer-events-none",
    dropdownOpen: "scale-y-100 opacity-100 pointer-events-auto",
    groupHeader: "px-2.5 pt-2.5 pb-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 select-none",
    option: "flex min-h-8 touch-manipulation cursor-pointer select-none items-center justify-between gap-2 rounded px-2.5 py-1.5 text-sm leading-5 text-gray-700 outline-none transition-colors duration-75 hover:bg-blue-500 hover:text-white",
    optionContent: "flex min-w-0 flex-1 items-center gap-2",
    optionText: "flex min-w-0 flex-1 flex-col",
    optionLabel: "font-normal",
    optionDetail: "text-xs font-normal text-gray-400",
    selectionContent: "flex min-w-0 flex-1 items-center overflow-hidden",
    selectionLabel: "truncate text-sm font-normal",
    optionImage: "size-8 shrink-0 rounded bg-gray-100 object-cover",
    optionMeta: "shrink-0 rounded bg-gray-200 px-1.5 py-0.5 text-[11px] font-medium text-gray-600",
    optionActive: "bg-blue-500 text-white [&_*]:text-white",
    optionSelected: "bg-gray-100 font-normal text-gray-800",
    optionCheck: "shrink-0",
    optionDisabled: "pointer-events-none cursor-not-allowed opacity-50",
    highlight: "rounded-sm bg-amber-200/80 px-0.5 text-inherit",
    status: "sr-only",
    message: "px-2.5 py-5 text-center text-sm text-gray-400",
    loadMore: "block w-full cursor-pointer rounded px-2.5 py-2 text-center text-sm text-blue-600 hover:bg-gray-100",
    spinner: "size-3.5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600",
    error: "px-2.5 py-2.5 text-sm text-red-600",
    tagDragging: "opacity-50 ring-1 ring-blue-400",
    tagDragOver: "border-l-2 border-l-blue-500"
  }
}

const DEFAULT_CLASSES = {
  wrapper: "tam-select relative block w-full min-w-0 max-w-full self-stretch text-zinc-900 [color-scheme:light] dark:text-zinc-100 dark:[color-scheme:dark]",
  control: "relative flex min-h-11 w-full touch-manipulation cursor-text flex-wrap items-center gap-1.5 overflow-hidden rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-normal text-zinc-800 shadow-sm transition duration-150 hover:border-zinc-300 focus-within:border-blue-500 focus-within:outline-2 focus-within:outline-blue-500/20 focus-within:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-black/20 dark:hover:border-zinc-600 dark:focus-within:border-blue-400 dark:focus-within:outline-blue-400/20",
  controlMultiple: "h-auto min-h-11 py-2",
  controlOpen: "border-blue-500 outline-2 outline-blue-500/20 outline-offset-2 dark:border-blue-400 dark:outline-blue-400/20",
  controlInvalid: "border-red-500 outline-2 outline-red-500/20 outline-offset-2 dark:border-red-400 dark:outline-red-400/20",
  controlDisabled: "cursor-not-allowed bg-zinc-50 opacity-60 dark:bg-zinc-800 dark:text-zinc-400",
  input: "min-w-12 flex-1 shrink basis-0 border-0 bg-transparent p-0 text-start text-base font-normal text-zinc-800 outline-none placeholder:font-normal placeholder:text-zinc-400 focus:ring-0 sm:text-sm dark:text-zinc-100 dark:placeholder:text-zinc-500",
  inputClosed: "absolute inset-0 z-[1] h-full w-full cursor-pointer opacity-0",
  trigger: "absolute inset-0 z-0 h-full w-full touch-manipulation cursor-pointer rounded-md border-0 bg-transparent p-0 focus:outline-none disabled:cursor-not-allowed",
  searchIcon: "size-3.5 shrink-0 text-zinc-400 dark:text-zinc-500",
  placeholder: "pointer-events-none min-w-0 flex-1 truncate font-normal text-zinc-400 dark:text-zinc-500",
  tag: "relative z-10 inline-flex max-w-full shrink-0 items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 transition-colors dark:bg-blue-950/50 dark:text-blue-300",
  tagRemove: "me-0.5 shrink-0 rounded p-0.5 hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:hover:bg-blue-900",
  clear: "relative z-20 inline-flex size-5 shrink-0 touch-manipulation items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 dark:focus:ring-blue-400",
  chevron: "pointer-events-none relative z-10 size-3.5 shrink-0 text-zinc-400 transition-transform",
  chevronOpen: "rotate-180",
  dropdown: "absolute z-50 mt-1 flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/50",
  dropdownSearch: "mb-0.5 flex w-full min-w-0 max-w-full shrink-0 items-center gap-1.5 rounded bg-zinc-50 px-2 py-1.5 transition dark:bg-zinc-800/70",
  results: "max-h-56 w-full min-w-0 max-w-full overflow-y-auto overscroll-contain scroll-py-1 p-1",
  dropdownAnimation: "origin-top",
  dropdownClosed: "mt-1 max-h-64 w-full scale-y-[0.97] opacity-0 pointer-events-none",
  dropdownOpen: "scale-y-100 opacity-100 pointer-events-auto",
  groupHeader: "px-2.5 pt-2.5 pb-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 select-none dark:text-zinc-400",
  option: "flex min-h-8 touch-manipulation cursor-pointer select-none items-center justify-between gap-2 rounded px-2.5 py-1.5 text-sm leading-5 text-zinc-700 outline-none transition-colors duration-75 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
  optionContent: "flex min-w-0 flex-1 items-center gap-2",
  optionText: "flex min-w-0 flex-1 flex-col",
  optionLabel: "font-normal",
  optionLabelWrap: "whitespace-normal break-words [overflow-wrap:anywhere]",
  optionDetail: "text-xs font-normal text-zinc-500 dark:text-zinc-400",
  optionDetailWrap: "whitespace-normal break-words [overflow-wrap:anywhere]",
  selectionContent: "flex min-w-0 flex-1 items-center overflow-hidden",
  selectionLabel: "truncate text-sm font-normal",
  optionImage: "size-8 shrink-0 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
  optionMeta: "shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
  optionActive: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white",
  optionSelected: "bg-blue-50 font-normal text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  optionCheck: "shrink-0 text-blue-600 dark:text-blue-400",
  optionDisabled: "pointer-events-none cursor-not-allowed opacity-50",
  highlight: "rounded-sm bg-amber-200/80 px-0.5 text-inherit dark:bg-amber-400/30",
  status: "sr-only",
  selectionToolbar: "flex shrink-0 flex-wrap items-center gap-1.5 border-b border-zinc-200 bg-zinc-50/80 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800/60",
  selectionAction: "inline-flex min-h-9 touch-manipulation items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-40",
  selectionActionSelect: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:text-zinc-950 dark:hover:bg-blue-400",
  selectionActionClear: "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white",
  selectionActionIcon: "size-3.5 shrink-0",
  selectionShortcut: "hidden rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 shadow-sm sm:inline-flex dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-500",
  selectionCount: "ms-auto rounded-full bg-zinc-200/70 px-2 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  message: "px-2.5 py-5 text-center text-sm text-zinc-500 dark:text-zinc-400",
  loadMore: "block w-full touch-manipulation cursor-pointer rounded px-2.5 py-2 text-center text-sm font-medium text-blue-600 hover:bg-zinc-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500 dark:text-blue-400 dark:hover:bg-zinc-800",
  spinner: "size-3.5 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-500 dark:border-zinc-700 dark:border-t-blue-400",
  error: "px-2.5 py-2.5 text-sm text-red-600 dark:text-red-400",
  tagDragging: "opacity-50 ring-1 ring-blue-400",
  tagDragOver: "border-l-2 border-l-blue-500"
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

  /**
   * Undo markup left by an instance that no longer exists, e.g. a select
   * restored from a page snapshot taken while it was enhanced.
   */
  static recoverStaleMarkup(select) {
    const saved = select.dataset.tamSelectState
    if (!saved || TamSelect.instances.has(select)) return
    let state
    try { state = JSON.parse(saved) } catch { state = null }
    const stale = select.nextElementSibling
    if (stale?.hasAttribute("data-tam-select-root")) stale.remove()
    // A portaled menu lives outside the wrapper. Remove it too, or its ids
    // collide with the new instance's and ARIA references resolve to it.
    const staleDropdown = select.id ? select.ownerDocument.getElementById(`${select.id}-dropdown`) : null
    if (staleDropdown?.hasAttribute("data-tam-select-dropdown")) staleDropdown.remove()
    if (state) {
      if (!state.srOnly) select.classList.remove("sr-only")
      if (state.tabindex === null) select.removeAttribute("tabindex")
      else select.setAttribute("tabindex", state.tabindex)
      if (state.ariaHidden === null) select.removeAttribute("aria-hidden")
      else select.setAttribute("aria-hidden", state.ariaHidden)
      if (state.id === null) select.removeAttribute("id")
    }
    delete select.dataset.tamSelectState
  }

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
      virtualItemHeight: 32,
      wrapOptionText: null,
      optionTooltip: true,
      draggable: false,
      maximumSelectionLength: 0,
      bulkActions: false,
      showSelectionCount: false,
      hideSelected: false,
      selectAllText: count => `Select all${count > 0 ? ` ${count}` : ""}`,
      deselectAllText: count => `Clear${count > 0 ? ` ${count}` : ""}`,
      selectionCountText: (count, limit) => limit > 0 ? `${count} / ${limit} selected` : `${count} selected`,
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
      dropdownWidth: "auto",
      maxDropdownWidth: 480,
      maxDropdownHeight: 360,
      viewportPadding: 8,
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
      selectionLimit: "selectionLimitText",
      selectAll: "selectAllText",
      deselectAll: "deselectAllText",
      selectionCount: "selectionCountText"
    }
    Object.entries(languageOptions).forEach(([languageKey, optionKey]) => {
      if (hasOwn(this.options.language, languageKey) && !hasOwn(options, optionKey)) {
        this.options[optionKey] = this.options.language[languageKey]
      }
    })
    this.dir = this.options.dir === "auto" ? this.detectDirection() : this.options.dir
    this.theme = this.options.theme === "auto" ? "default" : this.options.theme
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
    TamSelect.recoverStaleMarkup(select)
    this.originalTabIndex = select.getAttribute("tabindex")
    this.originalAriaHidden = select.getAttribute("aria-hidden")
    this.originalId = select.getAttribute("id")
    this.hadSrOnlyClass = select.classList.contains("sr-only")
    // Recorded on the element so a page snapshot (such as Turbo's cache)
    // still knows the native state after the live instance is gone.
    select.dataset.tamSelectState = JSON.stringify({
      tabindex: this.originalTabIndex,
      ariaHidden: this.originalAriaHidden,
      id: this.originalId,
      srOnly: this.hadSrOnlyClass
    })
    this.typeaheadBuffer = ""
    this.typeaheadTimer = null
    this.groupTree = []
    this.closeTimer = null
    this.closeTransitionHandler = null
    this.lazyObserver = null
    this.selectionLimitReached = false
    this.searchVisible = this.options.minimumResultsForSearch <= 0
    this.isVirtualScroll = false
    this.virtualStartIndex = 0
    this.onVirtualScroll = null
    this.remoteCache = new Map()
    this.destroyed = false
    this.refreshQueued = false
    this.composing = false
    this.animationsEnabled = this.options.animations && !(typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    this.build()
    this.bind()
    this.readNativeOptions()
    this.renderSelection()
    this.applyFitWidth()
    // Canvas measurements use fallback fonts until web fonts finish loading.
    document.fonts?.ready?.then(() => {
      if (this.destroyed) return
      this.textWidthCache?.clear()
      this.itemWidthCache = new WeakMap()
      this.applyFitWidth()
    })
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
    // "resolve" follows an inline width on the native select, like Select2,
    // and otherwise fills the container. "auto"/"fit" size the control to its
    // widest option the way a native select sizes itself.
    const requestedWidth = this.options.width === "resolve" ? (this.select.style.width || "100%") : this.options.width
    this.fitWidth = ["auto", "fit"].includes(String(requestedWidth).trim())
    this.wrapper.style.width = this.fitWidth ? "auto" : requestedWidth
    this.wrapper.style.maxWidth = "100%"
    this.wrapper.style.minWidth = "0"
    // Inline menus are positioned against the wrapper, even when a custom
    // `classes.wrapper` leaves out `relative`.
    this.wrapper.style.position = "relative"
    if (this.fitWidth) {
      this.wrapper.style.display = "inline-block"
      this.wrapper.style.verticalAlign = "middle"
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
      this.input.autocapitalize = "none"
      this.input.setAttribute("autocorrect", "off")
      this.input.setAttribute("enterkeyhint", "search")
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
    this.dropdown.dataset.tamSelectDropdown = ""
    this.dropdown.className = `${this.classes.dropdown} hidden`
    this.dropdown.style.width = "100%"
    this.dropdown.style.minWidth = "0"
    this.dropdown.style.maxWidth = "100%"
    this.dropdown.style.boxSizing = "border-box"
    if (this.animationsEnabled) {
      const preset = this.options.animationPreset ? ANIMATION_PRESETS[this.options.animationPreset] : null
      const duration = preset ? preset.duration : this.options.animationDuration
      const easing = preset ? preset.easing : this.options.animationEasing
      this.options.animationDuration = duration
      this.options.animationEasing = easing
      toggleClasses(this.dropdown, this.classes.dropdownAnimation, true)
      this.dropdown.style.setProperty("--tam-duration", `${duration}ms`)
      this.dropdown.style.setProperty("--tam-easing", easing)
      // Geometry is calculated at runtime for portaled menus. Animating `all`
      // also animated width/max-height, causing a large-to-small flash.
      this.dropdown.style.transition = [
        `opacity var(--tam-duration) var(--tam-easing)`,
        `transform var(--tam-duration) var(--tam-easing)`
      ].join(", ")
    }
    this.results = document.createElement("div")
    this.results.id = this.listboxId
    this.results.className = this.classes.results
    this.results.style.width = "100%"
    this.results.style.minWidth = "0"
    this.results.style.maxWidth = "100%"
    this.results.style.boxSizing = "border-box"
    this.results.setAttribute("role", "listbox")
    if (this.multiple) this.results.setAttribute("aria-multiselectable", "true")

    if (this.searchable && !this.multiple) {
      this.searchPanel = document.createElement("div")
      this.searchPanel.className = this.classes.dropdownSearch
      this.searchPanel.style.width = "100%"
      this.searchPanel.style.minWidth = "0"
      this.searchPanel.style.maxWidth = "100%"
      this.searchPanel.style.boxSizing = "border-box"
      this.input.style.width = "100%"
      this.input.style.minWidth = "0"
      this.input.style.maxWidth = "100%"
      this.input.style.boxSizing = "border-box"
      this.searchPanel.append(this.searchIcon, this.input)
      this.dropdown.append(this.searchPanel, this.results)
    } else {
      this.dropdown.append(this.results)
    }

    this.buildSelectionToolbar()

    this.status = document.createElement("div")
    this.status.className = this.classes.status
    this.status.setAttribute("role", "status")
    this.status.setAttribute("aria-live", "polite")
    this.status.setAttribute("aria-atomic", "true")

    const focusControl = this.multiple && this.searchable ? [this.searchIcon, this.input] : [this.trigger]
    this.control.append(this.values, ...focusControl, this.chevron, this.clearButton)
    this.wrapper.append(this.control, this.status)
    this.select.after(this.wrapper)
    this.dropdownParent = this.resolveDropdownParent()
    this.portalDropdown = Boolean(this.dropdownParent)
    if (this.portalDropdown) {
      this.dropdownParent.append(this.dropdown)
      this.dropdown.style.position = "fixed"
      this.dropdown.style.marginTop = "0"
      // Keep the unpositioned portal out of the first paint. It is revealed
      // synchronously after open() has measured and constrained it.
      this.dropdown.style.visibility = "hidden"
    } else {
      this.wrapper.append(this.dropdown)
    }
    this.labelElements = this.findLabelElements()
    this.applyDisabled()
    this.syncAria()
    this.initLazyObserver()
  }

  buildSelectionToolbar() {
    if (!this.multiple || !(this.options.bulkActions || this.options.showSelectionCount)) return
    this.selectionToolbar = document.createElement("div")
    this.selectionToolbar.className = this.classes.selectionToolbar
    this.selectionToolbar.dataset.tamSelectToolbar = ""
    if (this.options.bulkActions) {
      const makeAction = (action, icon, variantClass) => {
        const button = document.createElement("button")
        button.type = "button"
        button.className = `${this.classes.selectionAction} ${variantClass}`
        button.setAttribute("aria-controls", this.listboxId)
        const iconElement = document.createElement("span")
        iconElement.className = this.classes.selectionActionIcon
        iconElement.setAttribute("aria-hidden", "true")
        iconElement.innerHTML = icon
        const labelElement = document.createElement("span")
        button.append(iconElement, labelElement)
        button.addEventListener("click", event => {
          event.stopPropagation()
          if (!button.disabled) action()
        })
        return { button, labelElement }
      }
      const selectAction = makeAction(() => this.selectAll(), ICONS.check, this.classes.selectionActionSelect)
      const clearAction = makeAction(() => this.deselectAll(), ICONS.close, this.classes.selectionActionClear)
      this.selectAllButton = selectAction.button
      this.selectAllLabel = selectAction.labelElement
      this.deselectAllButton = clearAction.button
      this.deselectAllLabel = clearAction.labelElement
      this.selectionShortcut = document.createElement("kbd")
      this.selectionShortcut.className = this.classes.selectionShortcut
      this.selectionShortcut.textContent = /Mac|iPhone|iPad/.test(navigator.platform || "") ? "⌘ A" : "Ctrl A"
      this.selectionShortcut.title = "Toggle all matching options"
      this.selectionToolbar.append(this.selectAllButton, this.deselectAllButton, this.selectionShortcut)
      this.selectionToolbar.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          event.preventDefault()
          this.close(false)
          this.focusTarget.focus()
        } else if (event.key === "Tab") {
          const enabledActions = [this.selectAllButton, this.deselectAllButton].filter(button => !button.disabled)
          if (event.shiftKey && event.target === enabledActions[0]) {
            event.preventDefault()
            this.focusTarget.focus()
          } else if (!event.shiftKey && event.target === enabledActions.at(-1)) {
            // Restore the control's place in document tab order for body portals.
            this.focusTarget.focus()
            this.close(false)
          }
        }
      })
    }
    if (this.options.showSelectionCount) {
      this.selectionCount = document.createElement("span")
      this.selectionCount.className = this.classes.selectionCount
      this.selectionCount.setAttribute("role", "status")
      this.selectionCount.setAttribute("aria-live", "polite")
      this.selectionCount.setAttribute("aria-atomic", "true")
      this.selectionToolbar.append(this.selectionCount)
    }
    this.dropdown.insertBefore(this.selectionToolbar, this.results)
  }

  updateSelectionToolbar() {
    if (!this.selectionToolbar) return
    const count = this.selectedItems().length
    const limit = this.options.maximumSelectionLength
    if (this.selectionCount) {
      const text = typeof this.options.selectionCountText === "function"
        ? this.options.selectionCountText(count, limit)
        : this.options.selectionCountText
      if (this.selectionCount.textContent !== String(text)) this.selectionCount.textContent = text
    }
    if (this.selectAllButton) {
      const matches = this.bulkCandidates()
      const selectedMatches = matches.filter(item => item.selected).length
      const selectableMatches = matches.length - selectedMatches
      const selectText = typeof this.options.selectAllText === "function"
        ? this.options.selectAllText(matches.length)
        : this.options.selectAllText
      const deselectText = typeof this.options.deselectAllText === "function"
        ? this.options.deselectAllText(selectedMatches)
        : this.options.deselectAllText
      this.selectAllLabel.textContent = selectText
      this.deselectAllLabel.textContent = deselectText
      this.selectAllButton.setAttribute("aria-label", selectText)
      this.deselectAllButton.setAttribute("aria-label", deselectText)
      this.selectAllButton.disabled = this.select.disabled || (limit > 0 && count >= limit) || selectableMatches === 0
      this.deselectAllButton.disabled = this.select.disabled || selectedMatches === 0
      this.selectAllButton.setAttribute("aria-disabled", String(this.selectAllButton.disabled))
      this.deselectAllButton.setAttribute("aria-disabled", String(this.deselectAllButton.disabled))
    }
  }

  bind() {
    this.onControlClick = event => {
      if (!this.searchable || this.select.disabled || event.target.closest("button")) return
      this.open()
      this.input.focus()
    }
    this.onInput = event => {
      if (this.destroyed || this.composing || event?.isComposing) return
      this.query = this.input.value
      if (this.multiple && this.options.tokenSeparators.length && this.options.creatable) {
        this.tokenizeInput()
      }
      this.open(false)
      if (this.options.remoteUrl) this.scheduleRemote()
      else this.filterLocal()
    }
    this.onCompositionStart = () => { this.composing = true }
    this.onCompositionEnd = () => {
      this.composing = false
      queueMicrotask(() => {
        if (!this.destroyed && this.query !== this.input.value) this.onInput()
      })
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
      // After a failed page, wait for an explicit retry via Load more instead
      // of re-requesting it on every scroll.
      if (!this.error && this.results.scrollTop + this.results.clientHeight >= this.results.scrollHeight - 32) this.loadNextPage()
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
    this.onViewportChange = event => {
      if (!this.opened) return
      // The window scroll listener uses capture so it can follow scrolling
      // containers. It also sees the results panel's own scroll events, which
      // do not change the control's viewport position and must not resize it.
      if (event?.type === "scroll" && event.target === this.results) return
      if (this.portalDropdown) this.updateDropdownPosition()
      // An inline menu scrolls with its control, so only a resize can push
      // it past the viewport edge.
      else if (event?.type !== "scroll") this.updateInlineDropdownWidth()
    }

    this.control.addEventListener("click", this.onControlClick)
    this.focusTarget.addEventListener("keydown", this.onKeydown)
    if (this.input && this.input !== this.focusTarget) this.input.addEventListener("keydown", this.onKeydown)
    if (this.input) {
      this.input.addEventListener("input", this.onInput)
      this.input.addEventListener("compositionstart", this.onCompositionStart)
      this.input.addEventListener("compositionend", this.onCompositionEnd)
    }
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
    window.visualViewport?.addEventListener("resize", this.onViewportChange)
    window.visualViewport?.addEventListener("scroll", this.onViewportChange)
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

  viewportBox() {
    const padding = Math.max(0, Number(this.options.viewportPadding) || 0)
    const visualViewport = window.visualViewport
    const left = visualViewport?.offsetLeft || 0
    const top = visualViewport?.offsetTop || 0
    const width = visualViewport?.width || document.documentElement.clientWidth || window.innerWidth
    const height = visualViewport?.height || document.documentElement.clientHeight || window.innerHeight
    return { left, top, width, height, right: left + width, bottom: top + height, padding }
  }

  // Like a native select, the menu is never narrower than its control and
  // grows to fit its widest option, within maxDropdownWidth and the viewport.
  resolveDropdownWidth(triggerWidth, availableWidth) {
    const viewportLimit = availableWidth || triggerWidth
    if (!["auto", "content"].includes(this.options.dropdownWidth)) return Math.min(triggerWidth, viewportLimit)
    if (this.dropdownContentWidth == null || this.dropdownWidthStale) {
      // Keep the widest width seen while open, so filtering never shrinks or
      // shifts the menu under the pointer. open() resets it.
      this.dropdownContentWidth = Math.max(this.dropdownContentWidth || 0, this.measureDropdownContentWidth())
      this.dropdownWidthStale = false
    }
    const configuredMaximum = Number(this.options.maxDropdownWidth)
    const maximum = configuredMaximum > 0 ? Math.max(triggerWidth, configuredMaximum) : Infinity
    return Math.min(Math.max(triggerWidth, this.dropdownContentWidth), maximum, viewportLimit)
  }

  // Align the menu with the control's start edge, then keep it on screen.
  resolveDropdownLeft(rect, width, viewport) {
    const start = this.dir === "rtl" ? rect.right - width : rect.left
    const minimum = viewport.left + viewport.padding
    const maximum = Math.max(minimum, viewport.right - viewport.padding - width)
    return Math.min(Math.max(start, minimum), maximum)
  }

  // The horizontal space an inline menu may use: the viewport, narrowed by
  // every ancestor that clips overflow (cards, modals, scrolling tables), so
  // a wider menu is never cut off. Use dropdownParent to escape them.
  inlineDropdownBounds() {
    const viewport = this.viewportBox()
    let left = viewport.left + viewport.padding
    let right = viewport.right - viewport.padding
    const view = this.select.ownerDocument.defaultView
    const root = this.select.ownerDocument.documentElement
    for (let element = this.wrapper.parentElement; element && element !== root && element !== this.select.ownerDocument.body; element = element.parentElement) {
      const style = view.getComputedStyle(element)
      // Read the shorthand's x value too; some engines leave overflowX unset.
      const overflowX = [style.overflowX, String(style.overflow || "").split(/\s+/)[0]]
        .find(value => value && value !== "visible")
      if (!overflowX) continue
      const box = element.getBoundingClientRect()
      if (!box.width) continue
      const innerLeft = box.left + (element.clientLeft || 0)
      left = Math.max(left, innerLeft)
      right = Math.min(right, innerLeft + (element.clientWidth || box.width))
    }
    return { left, right: Math.max(left, right) }
  }

  updateInlineDropdownWidth() {
    if (this.portalDropdown || !this.opened) return
    const rect = this.control.getBoundingClientRect()
    if (!rect.width) return
    const bounds = this.inlineDropdownBounds()
    const width = this.resolveDropdownWidth(rect.width, Math.max(0, bounds.right - bounds.left))
    if (width <= rect.width + 0.5) {
      this.dropdown.style.width = "100%"
      this.dropdown.style.maxWidth = "100%"
      this.dropdown.style.left = ""
      this.dropdown.style.right = ""
      return
    }
    const offsetParentLeft = this.wrapper.getBoundingClientRect().left + (this.wrapper.clientLeft || 0)
    this.dropdown.style.width = `${width}px`
    this.dropdown.style.maxWidth = "none"
    this.dropdown.style.left = `${this.resolveDropdownLeft(rect, width, { ...bounds, padding: 0 }) - offsetParentLeft}px`
    this.dropdown.style.right = "auto"
  }

  updateDropdownPosition() {
    if (!this.portalDropdown) return
    const rect = this.control.getBoundingClientRect()
    const gap = 6
    const viewport = this.viewportBox()
    const { padding, top: viewportTop, bottom: viewportBottom } = viewport
    const maximumHeight = Math.max(96, Number(this.options.maxDropdownHeight) || 360)
    const searchHeight = this.searchPanel && !this.searchPanel.classList.contains("hidden")
      ? (this.searchPanel.getBoundingClientRect().height || 44)
      : 0
    const toolbarHeight = this.selectionToolbar?.getBoundingClientRect().height || (this.selectionToolbar ? 52 : 0)
    const dropdownChrome = Math.max(0, this.dropdown.offsetHeight - this.dropdown.clientHeight)
    // `dropdown.scrollHeight` reflects a previously applied max-height because
    // results is its own scrolling region. Measure the results' full content
    // instead so the menu can grow again when viewport space becomes available.
    const naturalHeight = this.results.scrollHeight > 0
      ? this.results.scrollHeight + searchHeight + toolbarHeight + dropdownChrome
      : (this.dropdown.scrollHeight || 288)
    const desiredHeight = Math.min(naturalHeight, maximumHeight)
    const availableBelow = Math.max(0, viewportBottom - rect.bottom - gap - padding)
    const availableAbove = Math.max(0, rect.top - viewportTop - gap - padding)
    const placeAbove = availableBelow < Math.min(desiredHeight, 192) && availableAbove > availableBelow
    const availableHeight = placeAbove ? availableAbove : availableBelow
    const dropdownHeight = Math.max(96, Math.min(desiredHeight, availableHeight || desiredHeight))
    const availableWidth = Math.max(0, viewport.width - (padding * 2))
    const dropdownWidth = this.resolveDropdownWidth(rect.width, availableWidth)
    const left = this.resolveDropdownLeft(rect, dropdownWidth, viewport)

    this.dropdown.style.left = `${left}px`
    this.dropdown.style.width = `${dropdownWidth}px`
    this.dropdown.style.maxWidth = `${availableWidth || dropdownWidth}px`
    this.dropdown.style.maxHeight = `${dropdownHeight}px`
    this.results.style.maxHeight = `${Math.max(48, dropdownHeight - searchHeight - toolbarHeight - dropdownChrome)}px`
    this.dropdown.style.top = `${placeAbove ? Math.max(viewportTop + padding, rect.top - dropdownHeight - gap) : rect.bottom + gap}px`
    this.dropdown.dataset.placement = placeAbove ? "top" : "bottom"
  }

  // Returns a function measuring text in `element`'s font. Canvas is exact;
  // environments without it (jsdom) fall back to an average glyph width.
  textMeasurer(element, fallbackFontSize = 16) {
    const view = this.select.ownerDocument.defaultView
    const style = element ? view.getComputedStyle(element) : null
    const fontSize = Number.parseFloat(style?.fontSize) || fallbackFontSize
    const averageCharacterWidth = fontSize * 0.58
    if (this.measureContext === undefined) {
      this.measureContext = null
      if (!/jsdom/i.test(view.navigator.userAgent)) {
        try {
          this.measureContext = this.select.ownerDocument.createElement("canvas").getContext("2d")
        } catch {
          this.measureContext = null
        }
      }
    }
    const context = this.measureContext
    const font = style?.font || `${style?.fontWeight || 400} ${fontSize}px ${style?.fontFamily || "sans-serif"}`
    // Menus re-measure on every keystroke, so cache widths per font. The cache
    // is bounded so long-lived remote selects cannot grow it without limit.
    this.textWidthCache ||= new Map()
    if (this.textWidthCache.size > 5000) this.textWidthCache.clear()
    return value => {
      const text = String(value ?? "")
      if (!text) return 0
      if (!context) return Array.from(text).length * averageCharacterWidth
      const key = `${font}\u0000${text}`
      let width = this.textWidthCache.get(key)
      if (width === undefined) {
        context.font = font
        width = context.measureText(text).width
        this.textWidthCache.set(key, width)
      }
      return width
    }
  }

  // The natural width of the open menu: its widest row plus option padding,
  // icons, and the scrollbar. Callers clamp it to the control and viewport.
  // Item widths are cached, so repeat renders (each keystroke) only measure
  // rows they have not seen, and only new rows trigger DOM layout reads.
  measureDropdownContentWidth() {
    this.itemWidthCache ||= new WeakMap()
    const renderedEntries = this.results.querySelectorAll("[data-tam-select-entry]")
    let textWidth = null
    const measureText = value => {
      textWidth ||= this.textMeasurer(renderedEntries[0] || this.results)
      return textWidth(value)
    }
    let measuredWidth = 0
    let sawNewItem = this.dropdownContentWidth == null
    this.visibleItems.forEach(entry => {
      const item = entry.item
      let width = item ? this.itemWidthCache.get(item) : undefined
      if (width === undefined) {
        const primaryWidth = item
          ? Math.max(measureText(item.label), measureText(item.detail))
          : measureText(entry.label)
        // Option and list padding, the dropdown border, and the selected check.
        width = primaryWidth + 56 + (item?.image ? 40 : 0) + (item?.meta ? measureText(item.meta) + 20 : 0)
        if (item) {
          this.itemWidthCache.set(item, width)
          sawNewItem = true
        }
      }
      measuredWidth = Math.max(measuredWidth, width)
    })

    // Custom templates and truncated rows can be wider than their text
    // estimate. Measure what actually overflows, but only for new content.
    if (sawNewItem) {
      renderedEntries.forEach(entry => {
        let widestContent = 0
        entry.querySelectorAll("*").forEach(element => {
          if (element.childElementCount === 0) {
            const visibleWidth = element.clientWidth || element.getBoundingClientRect().width || 0
            // Flex children often stretch to the popup's current width. Only
            // use DOM width when content genuinely overflows that box.
            if (element.scrollWidth > visibleWidth + 1) {
              widestContent = Math.max(widestContent, element.scrollWidth)
            }
          }
        })
        if (widestContent) measuredWidth = Math.max(measuredWidth, widestContent + 72)
      })
    }

    const scrollbarWidth = Math.max(0, (this.results.offsetWidth || 0) - (this.results.clientWidth || 0))
    return Math.ceil(measuredWidth + scrollbarWidth)
  }

  // width: "auto" sizes the closed control to its widest option, so picking
  // a different option never resizes it, exactly like a native select.
  applyFitWidth() {
    if (!this.fitWidth) return
    const view = this.select.ownerDocument.defaultView
    const style = view.getComputedStyle(this.control)
    const length = (value, fallback) => {
      const number = Number.parseFloat(value)
      return Number.isFinite(number) ? number : fallback
    }
    const textWidth = this.textMeasurer(this.control, 14)
    let widest = textWidth(this.options.placeholder)
    let hasImage = false
    this.items.forEach(item => {
      widest = Math.max(widest, textWidth(item.label))
      if (item.image) hasImage = true
    })
    const gap = length(style.columnGap, 6)
    const chrome = length(style.paddingLeft, 12) + length(style.paddingRight, 12) +
      length(style.borderLeftWidth, 1) + length(style.borderRightWidth, 1)
    const chevron = this.chevron.getBoundingClientRect().width || 14
    // Reserve the clear button even while it is hidden so the width is stable.
    const clear = this.options.clearable && this.canClear() ? (this.clearButton.getBoundingClientRect().width || 20) + gap : 0
    // Tags add their own padding and a remove button around the label.
    const tag = this.multiple ? 32 : 0
    const image = hasImage && !this.multiple ? 40 : 0
    const width = Math.ceil(widest + tag + image + chrome + gap + chevron + clear + 2)
    this.wrapper.style.width = `${width}px`
  }

  detectDirection() {
    // dir="auto" resolves from text content, not inheritance, so look past it
    // to the nearest explicit direction.
    const selectDir = this.select.closest('[dir="rtl" i], [dir="ltr" i]')?.getAttribute("dir")
    if (selectDir) return selectDir.toLowerCase()
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
      disabled: option.disabled || Boolean(option.closest("optgroup")?.disabled),
      selected: option.selected,
      option,
      group: null
    }
    const existing = this.previousItemsByOption?.get(option)
    return existing ? Object.assign(existing, attributes) : attributes
  }

  selectedItems() {
    return this.items.filter(item => (item.option ? item.option.selected : item.selected))
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
    this.matchedItems = candidateItems
    candidateItems = candidateItems.filter(item => !(this.options.hideSelected && item.selected))
    const previousId = preserveActive ? this.visibleItems[this.activeIndex]?.id : null
    const hasGroups = this.groupTree.some(group => group.type !== "ungrouped")

    let entries
    if (!hasGroups) {
      entries = candidateItems
        .map(item => ({ type: "item", id: item.id, item, disabled: Boolean(item.disabled) }))
    } else {
      // Key on item ids (values may repeat) and keep each group's entries in
      // candidate order so relevance sorting and custom sorters still apply.
      const rank = new Map(candidateItems.map((item, index) => [item.id, index]))
      const byRank = (left, right) => rank.get(left.item.id) - rank.get(right.item.id)
      entries = []
      for (const group of this.groupTree) {
        if (group.type === "ungrouped") {
          for (const entry of group.entries) {
            if (rank.has(entry.item.id)) {
              entries.push(entry)
            }
          }
        } else {
          const groupEntries = group.entries.filter(entry => rank.has(entry.item.id)).sort(byRank)
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
    // Like a native select, a single selection opens on its current choice
    // until a search query asks for the best match instead.
    const selectedIndex = !this.multiple && !this.query.trim()
      ? entries.findIndex(entry => entry.type === "item" && entry.item.selected && !entry.disabled)
      : -1
    const firstIndex = entries.findIndex(entry => !entry.disabled && entry.type !== "group-header")
    this.activeIndex = [preservedIndex, selectedIndex, firstIndex].find(index => index >= 0) ?? -1
  }

  createEntry() {
    const label = this.query.trim()
    if (!this.options.creatable || !label) return null
    if (this.multiple && this.options.maximumSelectionLength > 0 && this.selectedItems().length >= this.options.maximumSelectionLength) return null
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
    // A new first character cycles past the current option; further
    // characters refine the current match, so it is still a candidate.
    const offset = this.typeaheadBuffer.length > 1 ? 0 : 1
    const startIndex = this.activeIndex >= 0 ? this.activeIndex + offset : 0
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
      this.input.disabled = this.select.disabled
    }
    this.clearButton.classList.toggle("hidden", !this.options.clearable || !hasValue || !this.canClear() || this.select.disabled)
    this.updateSelectionToolbar()
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
    remove.addEventListener("click", event => { event.stopPropagation(); this.deselect(item) })
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
      toggleClasses(event.target, this.classes.tagDragging, true)
    })
  }

  onTagDragEnd() {
    this.draggedItem = null
    this.values.querySelectorAll("[data-tag-value]").forEach(el => {
      toggleClasses(el, this.classes.tagDragging, false)
      toggleClasses(el, this.classes.tagDragOver, false)
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
      toggleClasses(tag, this.classes.tagDragOver, true)
    }
  }

  onTagDragLeave(event) {
    const tag = event.target.closest("[data-tag-value]")
    if (tag) toggleClasses(tag, this.classes.tagDragOver, false)
  }

  onTagDrop(event, targetItem) {
    event.preventDefault()
    const sourceItem = this.draggedItem
    if (!sourceItem || sourceItem === targetItem) return

    const sourceIndex = this.selectedItems().indexOf(sourceItem)
    const targetIndex = this.selectedItems().indexOf(targetItem)
    if (sourceIndex < 0 || targetIndex < 0) return

    const option = sourceItem.option
    const targetOption = targetItem.option
    // Moving an option next to one in another optgroup would change its group.
    if (option && targetOption && option.parentElement === targetOption.parentElement) {
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
    this.updateSelectionToolbar()
    this.results.replaceChildren()
    this.results.setAttribute("aria-busy", String(this.loading))

    const remaining = Math.max(0, this.options.minQueryLength - this.query.trim().length)
    if (this.options.remoteUrl && remaining > 0) {
      const text = typeof this.options.inputTooShortText === "function" ? this.options.inputTooShortText(remaining) : this.options.inputTooShortText
      this.renderMessage(text)
      this.updateStatus(text)
      return this.finishDropdownRender()
    }
    if (this.error && !this.errorAfterResults) {
      const error = document.createElement("div")
      error.className = this.classes.error
      error.setAttribute("role", "alert")
      error.textContent = this.error
      this.results.append(error)
      this.updateStatus(this.error)
      return this.finishDropdownRender()
    }
    if (this.loading && this.loadingPage === 1) {
      this.renderMessage(this.options.loadingText, true)
      this.updateStatus(this.options.loadingText)
      return this.finishDropdownRender()
    }

    // emptyState covers an empty list; a search with no matches uses
    // noResultsState when one is set.
    const searching = Boolean(this.query.trim()) && Boolean(this.options.noResultsState)
    if (this.options.emptyState && !this.visibleItems.length && !this.loading && !searching) {
      const empty = document.createElement("div")
      empty.className = this.classes.message
      if (typeof this.options.emptyState === "function") this.options.emptyState(empty)
      else empty.textContent = this.options.emptyState
      this.results.append(empty)
      this.updateStatus("")
      return this.finishDropdownRender()
    }

    // Wrapped rows have variable heights, while this virtualizer deliberately
    // uses a fixed row height. Render the full list so multiline rows never
    // overlap, disappear, or produce incorrect scroll spacers.
    const largeList = this.options.virtualScroll || this.visibleItems.length > this.options.virtualScrollThreshold
    this.wrapOptionText = this.options.wrapOptionText ?? !largeList
    const shouldVirtual = !this.wrapOptionText && largeList
    this.isVirtualScroll = shouldVirtual
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
    if (this.error && this.errorAfterResults) {
      const error = document.createElement("div")
      error.className = this.classes.error
      error.setAttribute("role", "alert")
      error.textContent = this.error
      this.results.append(error)
    }
    if (this.loading && this.loadingPage > 1) this.renderMessage(this.options.loadingText, true)
    else if (this.hasMore) this.renderLoadMore()
    const resultCount = this.visibleItems.filter(entry => entry.type === "item").length
    const statusText = resultCount || this.visibleItems.length
        ? (typeof this.options.resultsText === "function" ? this.options.resultsText(resultCount) : this.options.resultsText)
        : this.options.noResultsText
    this.updateStatus(statusText)
    this.finishDropdownRender()
  }

  finishDropdownRender() {
    this.syncActiveDescendant()
    this.dropdownWidthStale = true
    if (this.portalDropdown) this.updateDropdownPosition()
    else this.updateInlineDropdownWidth()
    // A short first page never scrolls, so the scroll listener would never
    // ask for the next one. Load it as soon as the panel has room.
    if (this.options.remoteUrl && this.hasMore && !this.loading && !this.error && this.results.clientHeight > 0 &&
      this.results.scrollHeight <= this.results.clientHeight + 32) {
      const scheduleFrame = window.requestAnimationFrame || (callback => window.setTimeout(callback, 0))
      scheduleFrame(() => { if (this.opened && !this.destroyed) this.onScroll() })
    }
  }

  loadNextPage() {
    if (this.options.remoteUrl && this.hasMore && !this.loading) this.loadRemote(this.nextPage || this.page + 1, true)
  }

  renderLoadMore() {
    const button = document.createElement("button")
    button.type = "button"
    button.className = this.classes.loadMore
    button.textContent = this.options.loadMoreText
    button.dataset.tamSelectLoadMore = ""
    // Keep focus in the search input while the pointer presses the button.
    button.addEventListener("pointerdown", event => event.preventDefault())
    button.addEventListener("click", event => {
      event.stopPropagation()
      this.loadNextPage()
    })
    this.results.append(button)
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

  renderVirtualDropdown(preservedScrollTop = null, container = this.results) {
    this.isVirtualScroll = true
    const itemHeight = this.options.virtualItemHeight
    const buffer = this.options.virtualScrollBuffer
    const total = this.visibleItems.length
    const totalHeight = total * itemHeight
    const scrollTop = preservedScrollTop ?? this.results.scrollTop ?? 0
    const viewportHeight = this.results.clientHeight || 288
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
    const end = Math.min(total, Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer)

    if (start > 0) {
      const topSpacer = document.createElement("div")
      topSpacer.style.height = `${start * itemHeight}px`
      topSpacer.dataset.virtualSpacer = "top"
      container.append(topSpacer)
    }

    for (let i = start; i < end; i++) {
      const entry = this.visibleItems[i]
      if (entry.type === "group-header") {
        container.append(this.makeGroupHeader(entry))
      } else {
        container.append(this.makeOption(entry, i))
      }
    }

    if (end < total) {
      const bottomSpacer = document.createElement("div")
      bottomSpacer.style.height = `${(total - end) * itemHeight}px`
      bottomSpacer.dataset.virtualSpacer = "bottom"
      container.append(bottomSpacer)
    }
  }

  rerenderVirtualItems(targetScrollTop = null) {
    if (!this.isVirtualScroll || !this.opened) return
    // Replacing virtual rows can make browsers clamp scrollTop to zero. Build
    // the next window off-DOM, swap it atomically, then restore the position.
    const scrollTop = targetScrollTop ?? (this.results.scrollTop || 0)
    const fragment = document.createDocumentFragment()
    this.renderVirtualDropdown(scrollTop, fragment)
    this.results.replaceChildren(fragment)
    this.results.scrollTop = scrollTop
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
        check.className = this.classes.optionCheck
        check.innerHTML = ICONS.check
        option.append(check)
      }
    }

    option.addEventListener("pointerenter", () => {
      if (entry.disabled || this.activeIndex === index) return
      this.activeIndex = index
      this.updateActiveOption(false)
    })
    option.addEventListener("click", () => this.activateEntry(entry))
    return option
  }

  makeItemContent(item, selected = false) {
    const content = document.createElement("span")
    content.className = selected ? this.classes.selectionContent : this.classes.optionContent
    content.style.minWidth = "0"
    content.style.maxWidth = "100%"
    const template = this.renderTemplate(selected ? this.options.templateSelection : this.options.templateResult, item, selected ? "selection" : "result")
    if (template) {
      content.append(template)
      return content
    }
    if (selected) {
      const label = document.createElement("span")
      label.className = this.classes.selectionLabel
      label.style.minWidth = "0"
      label.style.overflow = "hidden"
      label.style.textOverflow = "ellipsis"
      label.style.whiteSpace = "nowrap"
      label.textContent = item.label
      if (this.options.optionTooltip) label.title = item.label
      content.append(label)
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
    label.className = [
      this.classes.optionLabel,
      this.wrapOptionText ? this.classes.optionLabelWrap : "truncate"
    ].filter(Boolean).join(" ")
    if (!this.wrapOptionText) {
      label.style.overflow = "hidden"
      label.style.textOverflow = "ellipsis"
      label.style.whiteSpace = "nowrap"
    }
    if (this.options.optionTooltip) label.title = item.label
    this.renderHighlightedText(label, item.label)
    text.append(label)
    if (item.detail) {
      const detail = document.createElement("span")
      detail.className = [
        this.classes.optionDetail,
        this.wrapOptionText ? this.classes.optionDetailWrap : "truncate"
      ].filter(Boolean).join(" ")
      if (!this.wrapOptionText) {
        detail.style.overflow = "hidden"
        detail.style.textOverflow = "ellipsis"
        detail.style.whiteSpace = "nowrap"
      }
      if (this.options.optionTooltip) detail.title = item.detail
      this.renderHighlightedText(detail, item.detail)
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
    if (this.composing || event.isComposing || event.keyCode === 229) return
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
    } else if (event.key === " " && event.target === this.trigger) {
      event.preventDefault()
      this.open()
    } else if (event.key === "Escape" && this.opened) {
      event.preventDefault()
      this.close()
      this.focusTarget.focus()
    } else if (event.key === "Backspace" && this.multiple && this.input && !this.input.value) {
      const last = this.selectedItems().at(-1)
      if (last) this.deselect(last)
    } else if (event.key === "Tab") {
      const action = this.selectionToolbar?.querySelector("button:not(:disabled)")
      if (this.opened && !event.shiftKey && action) {
        event.preventDefault()
        action.focus()
        return
      }
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
        // Keys typed into the search input are query text that the input
        // event filters on; typeahead there would move the active option
        // ahead of the filter. Typeahead is for a focused trigger only.
        if (event.target !== this.input) this.typeahead(event.key)
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
    const matches = this.bulkCandidates()
    const atLimit = this.options.maximumSelectionLength > 0 && this.selectedItems().length >= this.options.maximumSelectionLength
    if (matches.length && (matches.every(item => item.selected) || (atLimit && matches.some(item => item.selected)))) this.deselectAll()
    else this.selectAll()
  }

  bulkCandidates() {
    if (this.options.remoteUrl && (this.loading || this.error || this.query.trim().length < this.options.minQueryLength)) return []
    return (this.matchedItems || []).filter(item => !item.disabled)
  }

  /** Select loaded options matching the current search, up to the selection limit. */
  selectAll() {
    this.changeMatchingSelection(true)
  }

  /** Deselect loaded matches, including matches hidden by hideSelected. */
  deselectAll() {
    this.changeMatchingSelection(false)
  }

  changeMatchingSelection(selected) {
    if (!this.multiple || this.select.disabled || this.destroyed) return
    const changed = []
    let count = this.selectedItems().length
    for (const item of this.bulkCandidates()) {
      if (item.selected === selected) continue
      if (selected && this.options.maximumSelectionLength > 0 && count >= this.options.maximumSelectionLength) break
      if (!this.emit(selected ? "tam-select:selecting" : "tam-select:unselecting", { item }, true)) continue
      item.selected = selected
      item.option.selected = selected
      count += selected ? 1 : -1
      changed.push(item)
    }
    if (!changed.length) return
    this.commit()
    changed.forEach(item => this.emit(selected ? "tam-select:select" : "tam-select:unselect", { item }))
    this.emit("tam-select:bulk-change", { action: selected ? "select" : "deselect", items: changed, value: this.value })
    this.updateDropdownPosition()
  }

  updateActiveOption(scroll = true) {
    this.results.querySelectorAll("[data-tam-select-entry]").forEach(option => {
      const index = Number(option.dataset.tamSelectEntry)
      const entry = this.visibleItems[index]
      if (entry && entry.type !== "group-header") {
        const active = index === this.activeIndex
        const selected = !active && entry.type === "item" && entry.item.selected
        // Remove both state classes before adding one, since custom themes
        // may share utilities between them.
        toggleClasses(option, this.classes.optionActive, false)
        toggleClasses(option, this.classes.optionSelected, false)
        if (active) toggleClasses(option, this.classes.optionActive, true)
        if (selected) toggleClasses(option, this.classes.optionSelected, true)
      }
    })
    this.syncActiveDescendant(scroll)
  }

  /** Whether the single-select search input inside the dropdown is in use. */
  searchPanelActive() {
    return Boolean(this.searchable && !this.multiple && this.input && this.searchVisible)
  }

  syncActiveDescendant(scroll = false) {
    const entry = this.visibleItems[this.activeIndex]
    let active = entry && this.results.querySelector(`[data-tam-select-entry="${this.activeIndex}"]`)
    // Only explicit navigation moves the virtual window; a user scroll must
    // not snap back to the active row.
    if (scroll && entry && !active && this.isVirtualScroll && this.opened && !this.syncingVirtualWindow) {
      const itemHeight = this.options.virtualItemHeight
      const viewportHeight = this.results.clientHeight || 288
      const maxScrollTop = Math.max(0, this.visibleItems.length * itemHeight - viewportHeight)
      this.results.scrollTop = Math.min(maxScrollTop, Math.max(0, this.activeIndex * itemHeight - viewportHeight / 2))
      this.syncingVirtualWindow = true
      try {
        this.rerenderVirtualItems(this.results.scrollTop)
      } finally {
        this.syncingVirtualWindow = false
      }
      active = this.results.querySelector(`[data-tam-select-entry="${this.activeIndex}"]`)
    }
    const activeTarget = this.opened && this.searchPanelActive() ? this.input : this.focusTarget
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
      this.deselect(item)
    } else if (this.multiple && this.options.maximumSelectionLength > 0) {
      const selectedCount = this.selectedItems().length
      if (selectedCount >= this.options.maximumSelectionLength) {
        const text = typeof this.options.selectionLimitText === "function"
          ? this.options.selectionLimitText(this.options.maximumSelectionLength)
          : this.options.selectionLimitText
        this.updateStatus(text)
        return
      }
      this.selectValue(item)
    } else {
      this.selectValue(item)
    }
  }

  /** Select an item, or the first item with a value (creating it if needed). */
  selectValue(value) {
    if (this.select.disabled) return
    const item = this.resolveItem(value)
    if (!item || item.disabled) return
    // Re-picking the current choice changes nothing, so like a native select
    // it emits no select or change events.
    const alreadySelected = item.option?.selected && (this.multiple || this.selectedItems().length === 1)
    if (alreadySelected) {
      if (this.options.closeAfterSelect) this.close()
      else this.resetQueryAfterSelection()
      return
    }
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
    const hadQuery = Boolean(this.query)
    if (this.input) this.input.value = ""
    this.query = ""
    if (!this.options.remoteUrl) this.filterLocal()
    else if (hadQuery) this.scheduleRemote()
    else this.renderDropdown()
  }

  /** Deselect an item, or the first item with a value. */
  deselect(value) {
    if (this.select.disabled) return
    const item = this.items.includes(value) ? value : this.items.find(entry => String(entry.value) === String(value))
    if (!item) return
    if (!this.emit("tam-select:unselecting", { item }, true)) return
    item.selected = false
    if (item.option) item.option.selected = false
    this.commit()
    this.emit("tam-select:unselect", { item })
  }

  /** The empty option a single select falls back to when cleared. */
  emptyOption() {
    return Array.from(this.select.options).find(option => option.value === "") || null
  }

  canClear() {
    return this.multiple || Boolean(this.emptyOption())
  }

  clear() {
    if (this.select.disabled) return
    const items = this.selectedItems()
    // Without an empty option the browser re-selects the first option, so a
    // single select has no empty state to clear to.
    if (!items.length || !this.canClear() || !this.emit("tam-select:clearing", { items }, true)) return
    Array.from(this.select.options).forEach(option => { option.selected = false })
    this.items.forEach(item => { item.selected = false })
    if (!this.multiple) this.emptyOption().selected = true
    this.commit()
    this.emit("tam-select:clear", { items })
  }

  createItem(label, candidateValue = undefined) {
    if (this.select.disabled) return null
    const value = candidateValue ?? (typeof this.options.createValue === "function" ? this.options.createValue(label) : label)
    const existing = this.items.find(item => normalize(item.value) === normalize(value) || normalize(item.label) === normalize(label))
    if (existing) {
      this.selectValue(existing.value)
      return existing
    }
    if (this.multiple && this.options.maximumSelectionLength > 0 && this.selectedItems().length >= this.options.maximumSelectionLength) {
      const text = typeof this.options.selectionLimitText === "function"
        ? this.options.selectionLimitText(this.options.maximumSelectionLength)
        : this.options.selectionLimitText
      this.updateStatus(text)
      return null
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

  // Accepts an item from this instance, a copy or stale item (matched by its
  // value), or a plain value.
  resolveItem(value) {
    if (this.items.includes(value)) return value
    if (value && typeof value === "object") {
      if (value.value == null) return null
      return this.items.find(item => String(item.value) === String(value.value)) ||
        this.addItem({ value: value.value, label: value.label ?? value.value })
    }
    return this.ensureNativeOption(value)
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
    if (this.closeTransitionHandler) {
      this.dropdown.removeEventListener("transitionend", this.closeTransitionHandler)
      this.closeTransitionHandler = null
    }
    this.opened = true
    this.dropdownContentWidth = null
    if (this.options.minimumResultsForSearch > 0) {
      const totalOptions = this.options.remoteUrl ? Infinity : this.items.length
      this.searchVisible = totalOptions >= this.options.minimumResultsForSearch
      this.renderSelection()
    }
    if (this.portalDropdown) this.dropdown.style.visibility = "hidden"
    this.dropdown.classList.remove("hidden")
    if (this.animationsEnabled) {
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
      // Position before returning control to the browser so an unconstrained,
      // full-width portal can never flash for a frame.
      this.updateDropdownPosition()
      this.dropdown.style.visibility = ""
      const scheduleFrame = window.requestAnimationFrame || (callback => window.setTimeout(callback, 0))
      scheduleFrame(() => { if (this.opened) this.updateDropdownPosition() })
    }
    if (this.isVirtualScroll) this.syncActiveDescendant(true)
    const openTarget = this.searchPanelActive() ? this.input : this.focusTarget
    openTarget.focus({ preventScroll: true })
    this.emit("tam-select:open")
  }

  close(restoreFocus = true) {
    if (!this.opened) return
    if (!this.emit("tam-select:closing", {}, true)) return
    this.opened = false
    if (this.options.selectOnClose && this.activeIndex >= 0) {
      const entry = this.visibleItems[this.activeIndex]
      const alreadySelected = entry?.type === "item" && entry.item.option?.selected
      if (entry && entry.type !== "group-header" && !entry.disabled && !alreadySelected) this.activateEntry(entry)
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
      if (!this.multiple) this.updateVisibleItems(this.matchedItems, false)
    }
    this.renderSelection()
    if (restoreFocus && !this.multiple && this.input && document.activeElement === this.input) {
      this.focusTarget.focus({ preventScroll: true })
    }

    if (this.animationsEnabled) {
      toggleClasses(this.dropdown, this.classes.dropdownOpen, false)
      toggleClasses(this.dropdown, this.classes.dropdownClosed, true)
      const hide = () => {
        if (this.opened) return
        this.dropdown.classList.add("hidden")
        this.dropdown.removeEventListener("transitionend", hide)
        if (this.closeTransitionHandler === hide) this.closeTransitionHandler = null
      }
      this.closeTransitionHandler = hide
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
    this.errorAfterResults = false
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
        // A later page failed: keep the loaded options and offer Load more as
        // the retry, rather than replacing the list with the error.
        this.errorAfterResults = append && this.remoteResults.length > 0
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
    if (this.select.disabled && this.opened) this.close(false)
    toggleClasses(this.control, this.classes.controlDisabled, this.select.disabled)
    this.focusTarget.disabled = this.select.disabled
    this.clearButton.disabled = this.select.disabled
    this.syncAria()
  }

  refresh() {
    this.readNativeOptions()
    this.applyDisabled()
    this.renderSelection()
    this.applyFitWidth()
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
    if (this.destroyed) return
    this.destroyed = true
    this.cancelRemoteWork()
    clearTimeout(this.closeTimer)
    if (this.closeTransitionHandler) {
      this.dropdown.removeEventListener("transitionend", this.closeTransitionHandler)
      this.closeTransitionHandler = null
    }
    clearTimeout(this.typeaheadTimer)
    if (this.lazyObserver) { this.lazyObserver.disconnect(); this.lazyObserver = null }
    document.removeEventListener("pointerdown", this.onOutside)
    window.removeEventListener("resize", this.onViewportChange)
    window.removeEventListener("scroll", this.onViewportChange, true)
    window.visualViewport?.removeEventListener("resize", this.onViewportChange)
    window.visualViewport?.removeEventListener("scroll", this.onViewportChange)
    this.select.form?.removeEventListener("reset", this.onFormReset)
    this.mutationObserver?.disconnect()
    this.select.removeEventListener("change", this.onNativeChange)
    this.select.removeEventListener("invalid", this.onNativeInvalid)
    this.focusTarget.removeEventListener("keydown", this.onKeydown)
    if (this.input && this.input !== this.focusTarget) this.input.removeEventListener("keydown", this.onKeydown)
    if (this.input) {
      this.input.removeEventListener("input", this.onInput)
      this.input.removeEventListener("compositionstart", this.onCompositionStart)
      this.input.removeEventListener("compositionend", this.onCompositionEnd)
    }
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
    delete this.select.dataset.tamSelectState
    if (TamSelect.instances.get(this.select) === this) TamSelect.instances.delete(this.select)
  }
}

export { ANIMATION_PRESETS }
export default TamSelect
