import { JSDOM } from "jsdom"

const GLOBALS = [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLSelectElement",
  "HTMLInputElement",
  "HTMLButtonElement",
  "Option",
  "Event",
  "CustomEvent",
  "KeyboardEvent",
  "MouseEvent",
  "MutationObserver",
  "Node",
  "DOMException"
]

export function setupDOM(body = "") {
  const dom = new JSDOM(`<!doctype html><html><body>${body}</body></html>`, {
    url: "https://example.test/"
  })

  for (const name of GLOBALS) {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      writable: true,
      value: dom.window[name]
    })
  }

  if (!dom.window.HTMLElement.prototype.scrollIntoView) {
    dom.window.HTMLElement.prototype.scrollIntoView = function scrollIntoView() {}
  }

  if (!globalThis.IntersectionObserver) {
    globalThis.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }

  return () => {
    dom.window.close()
    for (const name of GLOBALS) delete globalThis[name]
    delete globalThis.fetch
  }
}

export function keydown(element, key, options = {}) {
  element.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...options }))
}

export function input(element, value) {
  element.value = value
  element.dispatchEvent(new Event("input", { bubbles: true }))
}

export const flush = (milliseconds = 0) => new Promise(resolve => setTimeout(resolve, milliseconds))

export function jsonResponse(data, { ok = true, status = 200 } = {}) {
  return {
    ok,
    status,
    async json() { return data }
  }
}
