export function on<K extends keyof WindowEventMap>(
  obj: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  obj.addEventListener(type, listener, options)
}

export function off<K extends keyof WindowEventMap>(
  obj: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | EventListenerOptions,
): void {
  obj.removeEventListener(type, listener, options)
}
