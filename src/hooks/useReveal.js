import { useEffect } from 'react'

// Adds `in-view` to every `.reveal` element as it scrolls into view.
// Honors reduced-motion and lack of IntersectionObserver by showing everything.
// Also watches for `.reveal` nodes added AFTER first paint (e.g. listings/about
// text that arrive from the backend a moment later) so they still get revealed
// instead of being stuck invisible at opacity:0.
export function useReveal(deps = []) {
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // gather `.reveal:not(.in-view)` from a node and its descendants
    const collect = (root) => {
      const list = []
      if (!root || root.nodeType !== 1) return list
      if (root.matches?.('.reveal:not(.in-view)')) list.push(root)
      root.querySelectorAll?.('.reveal:not(.in-view)').forEach((e) => list.push(e))
      return list
    }

    if (reduce || !('IntersectionObserver' in window)) {
      collect(document.body).forEach((e) => e.classList.add('in-view'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in-view')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    collect(document.body).forEach((e) => io.observe(e))

    // Content that arrives AFTER this scan (listings/about text loaded from the
    // backend) missed the observer entirely. Reveal it immediately on arrival —
    // it fades in via the CSS transition — instead of leaving it stuck at
    // opacity:0. (Re-observing would depend on the element later intersecting,
    // which never happens for carousel cards parked off-screen.)
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => collect(n).forEach((e) => e.classList.add('in-view'))))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
