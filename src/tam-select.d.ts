export interface TamSelectItem {
  id: string
  value: string
  label: string
  detail: string | null
  meta: string | null
  image: string | null
  disabled: boolean
  selected: boolean
  option: HTMLOptionElement
  group: string | null
}

export interface TamSelectVisibleEntry {
  type: "item" | "group-header" | "create"
  id: string
  item?: TamSelectItem
  group?: string
  label?: string
  value?: string
  disabled?: boolean
}

export interface TamSelectPagination {
  page?: number
  next_page?: number | null
  has_more?: boolean
  total_pages?: number
  [key: string]: unknown
}

export interface TamSelectTemplateContext {
  tamSelect: TamSelect
  context: "result" | "selection"
}

export interface TamSelectTransportOptions {
  url: URL
  query: string
  page: number
  headers: Record<string, string>
  signal: AbortSignal
  tamSelect: TamSelect
}

export interface TamSelectLanguage {
  placeholder?: string
  searchPlaceholder?: string
  noResults?: string
  create?: string | ((query: string) => string)
  loading?: string
  loadMore?: string
  inputTooShort?: string | ((remaining: number) => string)
  results?: string | ((count: number) => string)
  clear?: string
  remove?: string | ((item: TamSelectItem) => string)
  selectionLimit?: string | ((limit: number) => string)
}

export interface TamSelectOptions {
  /** Enable text filtering. Default: `true` */
  searchable?: boolean
  /** Allow typed values to become options. Default: `false` */
  creatable?: boolean
  /** Display the clear button. Default: `true` */
  clearable?: boolean
  /** Keep dropdown open after selection in multi-select. Default: `!select.multiple` */
  closeAfterSelect?: boolean
  /** Placeholder text for the closed control. Default: native prompt or `"Select…"` */
  placeholder?: string
  /** Placeholder for the search input. Default: `"Search…"` */
  searchPlaceholder?: string
  /** Text shown when no results match. Default: `"No results found"` */
  noResultsText?: string
  /** Template for the create action. Default: `` (query) => `Create "${query}"` `` */
  createText?: string | ((query: string) => string)
  /** Text shown while loading remote data. Default: `"Loading…"` */
  loadingText?: string
  /** Text shown at the bottom for infinite scroll. Default: `"Load more"` */
  loadMoreText?: string
  /** Message when input is too short. Default: `(remaining) => ...` */
  inputTooShortText?: string | ((remaining: number) => string)
  /** Remote search endpoint URL. Default: `null` */
  remoteUrl?: string | null
  /** Query parameter name for remote search. Default: `"q"` */
  queryParam?: string
  /** Query parameter name for pagination. Default: `"page"` */
  pageParam?: string
  /** Debounce delay in ms for remote requests. Default: `250` */
  debounce?: number
  /** Minimum characters before remote search fires. Default: `0` */
  minQueryLength?: number
  /** Enable fuzzy (typo-tolerant) matching. Default: `true` */
  fuzzySearch?: boolean
  /** Highlight matching text in results. Default: `true` */
  highlightMatches?: boolean
  /** Rank stronger matches first. Default: `true` */
  sortByRelevance?: boolean
  /** Fields searched in local mode. Default: `["label", "detail", "meta"]` */
  searchFields?: string[]
  /** Function or text for result count announcement. Default: `(count) => ...` */
  resultsText?: string | ((count: number) => string)
  /** Localized labels and messages. Explicit top-level text options take precedence. */
  language?: TamSelectLanguage
  /** Key for value in remote items. Default: `"value"` */
  valueField?: string
  /** Key for label in remote items. Default: `"label"` */
  labelField?: string
  /** Key for image URL in remote items. Default: `"image"` */
  imageField?: string
  /** Dot-separated path to items in remote response. Default: `"items"` */
  itemsPath?: string
  /** Dot-separated path to pagination in remote response. Default: `"pagination"` */
  paginationPath?: string
  /** Custom local matcher `(item, query) => boolean`. Default: `null` */
  matcher?: ((item: TamSelectItem, query: string) => boolean) | null
  /** Visual theme: `"default"`, `"daisyui"`, or `"auto"`. Default: `"auto"` */
  theme?: "default" | "daisyui" | "auto"
  /** Override any Tailwind class group. Default: `{}` */
  classes?: Record<string, string>
  /** Custom headers for remote requests. Default: `{}` */
  headers?: Record<string, string>
  /** Smooth dropdown open/close transitions. Default: `true` */
  animations?: boolean
  /** Built-in animation preset. Overrides animationDuration/animationEasing when set. Default: `null` */
  animationPreset?: "default" | "material" | "spring" | "snappy" | "smooth" | "bounce" | "elastic" | "fade" | "pop" | "slide" | "none" | null
  /** Animation duration in ms. Default: `150` */
  animationDuration?: number
  /** CSS easing function for animations. Default: `"ease-out"` */
  animationEasing?: string
  /** Custom content for empty option list. Default: `null` */
  emptyState?: string | ((el: HTMLDivElement) => void) | null
  /** Custom content when no results match. Default: `null` */
  noResultsState?: string | ((el: HTMLDivElement) => void) | null
  /** Custom content during loading. Default: `null` */
  loadingState?: string | ((el: HTMLDivElement) => void) | null
  /** Load option images only when visible via IntersectionObserver. Default: `false` */
  lazyLoadImages?: boolean
  /** Max items selectable in multi-select (0 = unlimited). Default: `0` */
  maximumSelectionLength?: number
  /** Max characters in search input (0 = unlimited). Default: `0` */
  maximumInputLength?: number
  /** Min options before showing search box. Default: `0` */
  minimumResultsForSearch?: number
  /** Auto-select active option when dropdown closes. Default: `false` */
  selectOnClose?: boolean
  /** Characters that trigger tag creation (e.g. `[",", " "]`). Default: `[]` */
  tokenSeparators?: string[]
  /** Custom sort function for filtered results. Default: `null` */
  sorter?: ((items: TamSelectItem[]) => TamSelectItem[]) | null
  /** Render a result. Return a Node for trusted markup or text for escaped output. */
  templateResult?: ((item: TamSelectItem, context: TamSelectTemplateContext) => Node | string | null | false) | null
  /** Render a selected value. Return a Node for trusted markup or text for escaped output. */
  templateSelection?: ((item: TamSelectItem, context: TamSelectTemplateContext) => Node | string | null | false) | null
  /** Custom remote transport. It may return JSON or a Response-like object. */
  transport?: ((options: TamSelectTransportOptions) => unknown | Promise<unknown>) | null
  /** Transform remote JSON before configured paths are read. */
  processResults?: ((data: unknown, context: { query: string; page: number; tamSelect: TamSelect }) => unknown | Promise<unknown>) | null
  /** Extra remote query parameters or a function that returns them. */
  remoteParams?: Record<string, unknown> | ((context: { query: string; page: number; tamSelect: TamSelect }) => Record<string, unknown>)
  /** Cache remote responses by final URL. Default: `false` */
  cacheRemote?: boolean
  /** Element or selector used to portal the dropdown beyond clipping containers. */
  dropdownParent?: Element | string | null
  /** Container width (CSS value or `"resolve"` for auto). Default: `"resolve"` */
  width?: string
  /** Text direction: `"ltr"`, `"rtl"`, or `"auto"`. Default: `"auto"` */
  dir?: "ltr" | "rtl" | "auto"
  /** Enable drag-and-drop reordering of selected tags. Default: `false` */
  draggable?: boolean
  /** Enable virtual scrolling. Default: `false` */
  virtualScroll?: boolean
  /** Auto-enable virtual scroll when items exceed this count. Default: `100` */
  virtualScrollThreshold?: number
  /** Extra items rendered above/below viewport. Default: `5` */
  virtualScrollBuffer?: number
  /** Estimated height per item in pixels for virtual scroll. Default: `44` */
  virtualItemHeight?: number
}

export interface TamSelectEventDetail {
  tamSelect: TamSelect
  [key: string]: unknown
}

export interface TamSelectChangeEventDetail extends TamSelectEventDetail {
  value: string | string[]
  items: TamSelectItem[]
}

export interface TamSelectLoadEventDetail extends TamSelectEventDetail {
  items: TamSelectItem[]
  pagination: TamSelectPagination
}

export interface TamSelectErrorEventDetail extends TamSelectEventDetail {
  error: Error
}

export interface TamSelectCreateEventDetail extends TamSelectEventDetail {
  item: TamSelectItem
}

export interface TamSelectDataEventDetail extends TamSelectEventDetail {
  items: (TamSelectItem | undefined)[]
}

export interface TamSelectReorderEventDetail extends TamSelectEventDetail {
  value: string | string[]
  items: TamSelectItem[]
}

declare class TamSelect {
  static instances: WeakMap<HTMLSelectElement, TamSelect>
  static getInstance(element: HTMLSelectElement): TamSelect | null

  constructor(select: HTMLSelectElement, options?: TamSelectOptions)

  /** The underlying `<select>` element */
  readonly select: HTMLSelectElement
  /** The generated wrapper `<div>` */
  readonly wrapper: HTMLDivElement
  /** The control `<div>` containing the selection display */
  readonly control: HTMLDivElement
  /** The dropdown panel containing search and results */
  readonly dropdown: HTMLDivElement
  /** The scrollable listbox containing rendered options */
  readonly results: HTMLDivElement
  /** The search `<input>` (when searchable) */
  readonly input: HTMLInputElement | undefined
  /** The trigger `<button>` (when not searchable) */
  readonly trigger: HTMLButtonElement | undefined
  /** The clear `<button>` */
  readonly clearButton: HTMLButtonElement
  /** Current resolved text direction */
  readonly dir: "ltr" | "rtl"
  /** Current resolved theme */
  readonly theme: "default" | "daisyui"
  /** Whether the dropdown is open */
  readonly opened: boolean
  /** Whether remote data is loading */
  readonly loading: boolean
  /** Whether the selection limit has been reached */
  readonly selectionLimitReached: boolean
  /** Current search query */
  readonly query: string
  /** All parsed items */
  readonly items: TamSelectItem[]
  /** Currently visible items in the dropdown */
  readonly visibleItems: TamSelectVisibleEntry[]
  /** Currently active (highlighted) option index */
  readonly activeIndex: number
  /** All parsed option groups */
  readonly groupTree: Array<{
    label?: string
    type?: string
    items: TamSelectItem[]
    entries: TamSelectVisibleEntry[]
  }>
  /** Current merged class map */
  readonly classes: Record<string, string>
  /** Current TamSelect options */
  readonly options: TamSelectOptions

  /** The current selection value (string for single, array for multi) */
  get value(): string | string[]

  /** Open the dropdown */
  open(loadRemote?: boolean): void
  /** Close the dropdown */
  close(): void
  /** Focus the search input or trigger */
  focus(): void
  /** Remove focus */
  blur(): void
  /** Set the selected value(s) */
  setValue(value: string | string[] | null): void
  /** Clear all selections */
  clear(): void
  /** Re-read native options and re-render */
  refresh(): void
  /** Add one or more options programmatically */
  addData(raw: Record<string, unknown> | Record<string, unknown>[]): void
  /** Remove options by value */
  removeData(values: string | string[]): void
  /** Clear cached remote responses */
  clearRemoteCache(): void
  /** Select a value programmatically */
  selectValue(value: string): void
  /** Deselect a value */
  deselect(value: string): void
  /** Create a new option from a label */
  createItem(label: string, value?: string): TamSelectItem
  /** Remove all generated markup and restore the native select */
  destroy(): void

  /** Read the selected items */
  selectedItems(): TamSelectItem[]
  /** Refresh the visible items list */
  updateVisibleItems(items: TamSelectItem[], preserveActive?: boolean): void
  /** Toggle item selection */
  toggleItem(item: TamSelectItem): void
}

export declare const ANIMATION_PRESETS: Record<string, { duration: number; easing: string }>

export default TamSelect
