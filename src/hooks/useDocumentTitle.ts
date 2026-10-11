import { useEffect } from 'react'

function upsertMeta(attribute: string, value: string, content: string): void {
  const selector = `meta[${attribute}="${value}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Sets a unique document title plus description and Open Graph metadata for
 * the current route.
 */
export function useDocumentTitle(title: string, description?: string): void {
  useEffect(() => {
    document.title = title
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:title', title)
      upsertMeta('property', 'og:description', description)
    }
  }, [title, description])
}

export default useDocumentTitle
